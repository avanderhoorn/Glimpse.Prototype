using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using Glimpse.Agent.Messages;
using Microsoft.AspNet.FileProviders;
using Microsoft.Extensions.PlatformAbstractions;

namespace Glimpse.Agent.Internal.Inspectors
{
    public class ExceptionProcessor : IExceptionProcessor
    {
        private static readonly int SourceCodeLineCount = 6;  // TODO: Make as an option?
        private static readonly bool IsMono = Type.GetType("Mono.Runtime") != null;
        private readonly IFileProvider _fileProvider;

        public ExceptionProcessor(IApplicationEnvironment appEnvironment)
        {
            // TODO: Allow the user to configure which provider should be used
            _fileProvider = new PhysicalFileProvider(appEnvironment.ApplicationBasePath);
        }

        public IEnumerable<ExceptionDetails> GetErrorDetails(Exception ex)
        {
            var result = new List<ExceptionDetails>();

            for (var scan = ex; scan != null; scan = scan.InnerException)
            {
                result.Add(new ExceptionDetails
                    {
                        Type = scan.GetType(),
                        TypeName = scan.GetType().Name,
                        Message = scan.Message,
                        RawException = scan.ToString(),
                        StackFrames = StackFrames(scan)
                    });
            }

            return result;
        }

        private IEnumerable<StackFrame> StackFrames(Exception ex)
        {
            var result = new List<StackFrame>();

            var stackTrace = ex.StackTrace;
            if (!string.IsNullOrEmpty(stackTrace))
            {
                var heap = new Chunk { Text = stackTrace + Environment.NewLine, End = stackTrace.Length + Environment.NewLine.Length };
                for (var line = heap.Advance(Environment.NewLine); line.HasValue; line = heap.Advance(Environment.NewLine))
                {
                    result.Add(StackFrame(line));
                }
            }

            return result;
        }

        private StackFrame StackFrame(Chunk line)
        {
            line.Advance("  at ");
            var function = line.Advance(" in ").ToString();

            //exception message line format differences in .net and mono
            //On .net : at ConsoleApplication.Program.Main(String[] args) in D:\Program.cs:line 16
            //On Mono : at ConsoleApplication.Program.Main(String[] args) in d:\Program.cs:16
            var file = !IsMono ?
                line.Advance(":line ").ToString() :
                line.Advance(":").ToString();

            var lineNumber = line.ToInt32();

            if (string.IsNullOrEmpty(file))
            {
                return GetStackFrame(
                    // Handle stack trace lines like
                    // "--- End of stack trace from previous location where exception from thrown ---"
                    string.IsNullOrEmpty(function) ? line.ToString() : function,
                    file: string.Empty,
                    lineNumber: 0);
            }
            else
            {
                return GetStackFrame(function, file, lineNumber);
            }
        }

        // make it internal to enable unit testing
        internal StackFrame GetStackFrame(string function, string file, int lineNumber)
        {
            var frame = new StackFrame { Function = function, File = file, Line = lineNumber };

            if (string.IsNullOrEmpty(file))
            {
                return frame;
            }

            IEnumerable<string> lines = null;
            if (File.Exists(file))
            {
                lines = File.ReadLines(file);
            }
            else
            {
                // Handle relative paths and embedded files
                var fileInfo = _fileProvider.GetFileInfo(file);
                if (fileInfo.Exists)
                {
                    // ReadLines doesn't accept a stream. Use ReadLines as its more efficient
                    // relative to reading lines via stream reader
                    if (!string.IsNullOrEmpty(fileInfo.PhysicalPath))
                    {
                        lines = File.ReadLines(fileInfo.PhysicalPath);
                    }
                    else
                    {
                        lines = ReadLines(fileInfo);
                    }
                }
            }

            if (lines != null)
            {
                ReadFrameContent(frame, lines, lineNumber, lineNumber);
            }

            return frame;
        }

        // make it internal to enable unit testing
        internal void ReadFrameContent(
            StackFrame frame,
            IEnumerable<string> allLines,
            int errorStartLineNumberInFile,
            int errorEndLineNumberInFile)
        {
            // Get the line boundaries in the file to be read and read all these lines at once into an array.
            var preErrorLineNumberInFile = Math.Max(errorStartLineNumberInFile - SourceCodeLineCount, 1);
            var postErrorLineNumberInFile = errorEndLineNumberInFile + SourceCodeLineCount;
            var codeBlock = allLines
                .Skip(preErrorLineNumberInFile - 1)
                .Take(postErrorLineNumberInFile - preErrorLineNumberInFile + 1)
                .ToArray();

            var numOfErrorLines = (errorEndLineNumberInFile - errorStartLineNumberInFile) + 1;
            var errorStartLineNumberInArray = errorStartLineNumberInFile - preErrorLineNumberInFile;

            frame.PreContextLine = preErrorLineNumberInFile;
            frame.PreContextCode = codeBlock.Take(errorStartLineNumberInArray).ToArray();
            frame.ContextCode = codeBlock
                .Skip(errorStartLineNumberInArray)
                .Take(numOfErrorLines)
                .ToArray();
            frame.PostContextCode = codeBlock
                .Skip(errorStartLineNumberInArray + numOfErrorLines)
                .ToArray();
        }

        private static IEnumerable<string> ReadLines(IFileInfo fileInfo)
        {
            var result = new List<string>();

            using (var reader = new StreamReader(fileInfo.CreateReadStream()))
            {
                string line;
                while ((line = reader.ReadLine()) != null)
                {
                    result.Add(line);
                }
            }

            return result;
        }

        internal class Chunk
        {
            public string Text { get; set; }
            public int Start { get; set; }
            public int End { get; set; }

            public bool HasValue => Text != null;

            public Chunk Advance(string delimiter)
            {
                var indexOf = HasValue ? Text.IndexOf(delimiter, Start, End - Start, StringComparison.Ordinal) : -1;
                if (indexOf < 0)
                {
                    return new Chunk();
                }

                var chunk = new Chunk { Text = Text, Start = Start, End = indexOf };
                Start = indexOf + delimiter.Length;
                return chunk;
            }

            public override string ToString()
            {
                return HasValue ? Text.Substring(Start, End - Start) : string.Empty;
            }

            public int ToInt32()
            {
                int value;
                return HasValue && int.TryParse(
                    Text.Substring(Start, End - Start),
                    NumberStyles.Integer,
                    CultureInfo.InvariantCulture,
                    out value) ? value : 0;
            }
        }
    }
}