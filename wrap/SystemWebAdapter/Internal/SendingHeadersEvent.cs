using System;
using System.Collections.Generic;
using System.Threading;

namespace SystemWebAdapter.Internal
{
    public class SendingHeadersEvent
    {
        private IList<Tuple<Action<object>, object>> _callbacks = new List<Tuple<Action<object>, object>>();

        internal void Register(Action<object> callback, object state)
        {
            if (_callbacks == null)
            {
                throw new InvalidOperationException("Exception_CannotRegisterAfterHeadersSent");
            }
            _callbacks.Add(new Tuple<Action<object>, object>(callback, state));
        }

        internal void Fire()
        {
            var callbacks = Interlocked.Exchange(ref _callbacks, null);
            if (callbacks == null)
            {
                return;
            }
            var count = callbacks.Count;
            for (var index = 0; index != count; ++index)
            {
                var tuple = callbacks[count - index - 1];
                tuple.Item1(tuple.Item2);
            }
        }
    }
}
