using System;
using System.Security.Claims;
using System.Security.Principal;
using System.Threading.Tasks;

namespace SystemWebAdapter.Internal
{
    internal static class Utils
    {
        public static Task CompletedTask = CreateCompletedTask();
        public static Task CancelledTask = CreateCancelledTask();

        private static Task CreateCompletedTask()
        {
            TaskCompletionSource<object> tcs = new TaskCompletionSource<object>();
            tcs.TrySetResult(null);
            return tcs.Task;
        }

        private static Task CreateCancelledTask()
        {
            TaskCompletionSource<object> tcs = new TaskCompletionSource<object>();
            tcs.TrySetCanceled();
            return tcs.Task;
        }

        public static Task CreateFaultedTask(Exception ex)
        {
            TaskCompletionSource<object> tcs = new TaskCompletionSource<object>();
            tcs.TrySetException(ex);
            return tcs.Task;
        }

        // Converts path value to a normal form.
        // Null values are treated as string.empty.
        // A path segment is always accompanied by it's leading slash.
        // A root path is string.empty
        public static string NormalizePath(string path)
        {
            if (string.IsNullOrEmpty(path))
            {
                return path ?? string.Empty;
            }
            if (path.Length == 1)
            {
                return path[0] == '/' ? string.Empty : '/' + path;
            }
            return path[0] == '/' ? path : '/' + path;
        }

        public static ClaimsPrincipal MakeClaimsPrincipal(IPrincipal principal)
        {
            if (principal == null)
            {
                return null;
            }
            if (principal is ClaimsPrincipal)
            {
                return principal as ClaimsPrincipal;
            }
            return new ClaimsPrincipal(principal);
        }
    }
}