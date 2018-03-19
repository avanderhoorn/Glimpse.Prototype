using Glimpse.Agent.Internal.Messaging;
using Glimpse.Internal;

namespace Glimpse.Agent.Messages
{
    public class UserIdentificationMessage
    {
        public UserIdentificationMessage(string userId, string username, string email, string image, bool isAnonymous)
        {
            UserId = userId;
            Username = username;
            Email = email;
            Image = image;
            IsAnonymous = isAnonymous;
        }

        [PromoteToUserId]
        public string UserId { get; }

        public string Username { get; }

        public string Email { get; }

        public string Image { get; }

        public bool IsAnonymous { get; }
    }
}