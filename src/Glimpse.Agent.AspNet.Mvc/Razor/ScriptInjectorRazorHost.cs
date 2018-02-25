//using System.Collections.Generic;
//using System.Linq;
//using Microsoft.AspNetCore.Mvc.Razor;
//using Microsoft.AspNetCore.Mvc.Razor.Directives;
//using Microsoft.AspNetCore.Razor.Chunks;
//using Microsoft.AspNetCore.Razor.Compilation.TagHelpers;

//namespace Glimpse.Agent.Razor
//{
//    public class ScriptInjectorRazorHost : MvcRazorHost
//    {
//        public ScriptInjectorRazorHost(IChunkTreeCache codeTreeCache, ITagHelperDescriptorResolver resolver) 
//            : base(codeTreeCache, resolver)
//        {
//        }

//        private IReadOnlyList<Chunk> _overriddenChunks;

//        public override IReadOnlyList<Chunk> DefaultInheritedChunks
//        {
//            get
//            {
//                if (_overriddenChunks != null)
//                    return _overriddenChunks;

//                var original = base.DefaultInheritedChunks.ToArray();
//                var newArray = new Chunk[original.Length + 1];

//                original.CopyTo(newArray, 0);

//                newArray[original.Length] = new AddTagHelperChunk
//                {
//                    LookupText = "*, Glimpse.Agent.AspNet.Mvc"
//                };

//                _overriddenChunks = newArray;

//                return _overriddenChunks;
//            }
//        }
//    }
//}
