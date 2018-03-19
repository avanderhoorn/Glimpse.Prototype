using System;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Builder;

namespace Glimpse.Server.Internal.Middleware
{
    /// <summary>
    /// Extension methods for the DefaultEmbeddedFilesMiddleware
    /// </summary>
    public static class DefaultEmbeddedFilesExtensions
    {
        /// <summary>
        /// Enables default file mapping on the current path
        /// </summary>
        /// <param name="app"></param>
        /// <returns></returns>
        public static IApplicationBuilder UseDefaultEmbeddedFiles(this IApplicationBuilder app)
        {
            if (app == null)
            {
                throw new ArgumentNullException(nameof(app));
            }

            return app.UseMiddleware<DefaultEmbeddedFilesMiddleware>();
        }

        /// <summary>
        /// Enables default file mapping for the given request path
        /// </summary>
        /// <param name="app"></param>
        /// <param name="requestPath">The relative request path.</param>
        /// <returns></returns>
        public static IApplicationBuilder UseDefaultEmbeddedFiles(this IApplicationBuilder app, string requestPath)
        {
            if (app == null)
            {
                throw new ArgumentNullException(nameof(app));
            }

            return app.UseDefaultEmbeddedFiles(new DefaultFilesOptions
            {
                RequestPath = new PathString(requestPath)
            });
        }

        /// <summary>
        /// Enables default file mapping with the given options
        /// </summary>
        /// <param name="app"></param>
        /// <param name="options"></param>
        /// <returns></returns>
        public static IApplicationBuilder UseDefaultEmbeddedFiles(this IApplicationBuilder app, DefaultFilesOptions options)
        {
            if (app == null)
            {
                throw new ArgumentNullException(nameof(app));
            }
            if (options == null)
            {
                throw new ArgumentNullException(nameof(options));
            }

            return app.UseMiddleware<DefaultEmbeddedFilesMiddleware>(Options.Create(options));
        }
    }
}
