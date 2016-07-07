#if DNX
using System.Collections.Concurrent;
using System.Globalization;
using System.Text;
using Glimpse.Agent.Inspectors;
using Glimpse.Agent.Messages;
using Glimpse.Common;
using Glimpse.Internal.Extensions;
using Glimpse.Internal;
using Microsoft.AspNet.Http;
using Microsoft.AspNet.Http.Features;

namespace Glimpse.Agent.Internal.Inspectors.Mvc
{
    public class UserInspector : Inspector
    {
        private readonly string[] _titles =
            {
                "Abbess", "Abbot", "Admiral", "Agent", "Alderman", "Ambassador", "Apostle", "Apprentice", "Archbishop",
                "Archdeacon", "Archduchess", "Archduke", "Assistant", "Associate", "Attaché", "Attorney", "Aunt",
                "Auntie", "Bailiff", "Baron", "Baroness", "Barrister", "Bishop", "Brigadier", "Brother", "Burgess",
                "Caliph", "Captain", "Cardinal", "Chairman", "Chairwoman", "Chancellor", "Chef", "Chief", "Citizen",
                "Coach", "Colonel", "Commander", "Commissioner", "Commodore", "Comptroller", "Comrade", "Constable",
                "Consul", "Corporal", "Councillor", "Count", "Countess", "Courtier", "Curator", "Dame", "Darth",
                "Deacon", "Dean", "Delegate", "Deputy", "Dictator", "Doctor", "Dom", "Duchess", "Duke", "Earl", "Elder",
                "Emcee", "Eminence", "Emperor", "Empress", "Ensign", "Envoy", "Esquire", "Executor", "Farmer", "Father",
                "Fellow", "Fleet Admiral", "Friar", "General", "Giant", "Grandmaster", "Grand Admiral", "Grand General",
                "Grand Moff", "Govenor", "Guru", "Headman", "Herald", "High Admiral", "High Colonel", "Highness",
                "Honorable", "Imam", "Inquisitor", "Internal", "Jedi", "Journeyman", "Judge", "Justice", "Kaiser",
                "King", "Lady", "Leader", "Lecturer", "Lieutenant", "Lord", "Madam", "Mage", "Magistrate", "Maid",
                "Majesty", "Major", "Marquess", "Marquis", "Marshal", "Master", "Mate", "Matriarch", "Mawlawi", "Major",
                "Mayor", "Moff", "Midshipman", "Minister", "Miss", "Mother", "Mrs", "Noble", "Nurse", "Officer", "Page",
                "Pastor", "Patriarch", "Patroon", "Pharaoh", "Pope", "Prefect", "Prelate", "Premier", "Presbyter",
                "President", "Protected", "Priest", "Primate", "Prime Minister", "Prince", "Princess", "Principal",
                "Private", "Professor", "Provost", "Public", "Queen", "Rabbi", "Raja", "Rear Admiral", "Reader",
                "Rector", "Registrar", "Representative", "Reverend", "Saint", "Samurai", "Secretary", "Selectman",
                "Senator", "Sergeant", "Shah", "Shaman", "Sheik", "Sir", "Sister", "Solicitor", "Speaker", "Squire",
                "Steward", "Sublieutenant", "Sultan", "Supergiant", "Superintendent", "Swami", "Treasurer", "Tsar",
                "Tsarina", "Uncle", "Venerable", "Viceroy", "Vice Admiral", "Viscount", "Viscountness", "Warden",
                "Your Excellency", "Your Grace", "Your Honor", "ABR", "CCE", "CCISO", "CCNA", "CCNP", "CEH", "CEM",
                "CFCE", "CISA", "CISM", "CISSP", "CLA", "CNP", "CP", "CPA", "CPLP", "CPM", "CRISC", "CRO", "CSCU",
                "CSTE", "DC", "DD", "DDS", "DMD", "DO", "DVM", "EdD", "Esquire", "GISP", "IAEE", "Junior", "LLD", "Ltd",
                "MCDBA", "MCP", "MCSE", "MCT", "MD", "MSA", "Of Austin", "Of Brisbane", "Of Miami", "Of Oz",
                "Of Portland", "Of York", "PCI", "PE", "PhD", "PI", "PMP", "PSM", "Retired", "SE", "Senior", "The Fifth",
                "The Fourth", "The Second", "The Sixth", "The Third", "USAF", "USCG", "USMC", "USN"
            };
        private readonly string[] _firstNames =
            {
                "Aaron", "Adam", "Alan", "Albert", "Alfred", "Alice", "Allen", "Amanda",
                "Amy", "Andrea", "Andrew", "Angela", "Ann", "Anna", "Annie", "Anthony", "Antonio", "Arthur", "Ashley",
                "Barbara", "Ben", "Betty", "Beverly", "Billy", "Bobby", "Bonnie", "Bradley", "Brandon", "Brenda", "Brian",
                "Bruce", "Bryan", "Carl", "Carlos", "Carmen", "Carol", "Carolyn", "Catherine", "Chad", "Charles", "Cheryl",
                "Chris", "Christina", "Christine", "Cindy", "Clarence", "Connie", "Craig", "Crystal", "Curtis", "Cynthia",
                "Dale", "Daniel", "Danny", "David", "Dawn", "Deborah", "Debra", "Denise", "Dennis", "Diana", "Diane",
                "Donald", "Donna", "Doris", "Dorothy", "Douglas", "Earl", "Edith", "Edna", "Edward", "Elaine", "Elizabeth",
                "Ellen", "Emily", "Eric", "Ernest", "Ethel", "Eugene", "Eva", "Evelyn", "Florence", "Frances", "Francis",
                "Frank", "Fred", "Gary", "George", "Gerald", "Gladys", "Glenn", "Gloria", "Grace", "Gregory", "Harold",
                "Harry", "Heather", "Helen", "Henry", "Howard", "Irene", "Jack", "Jacob", "Jacqueline", "James", "Jane",
                "Janet", "Janice", "Jason", "Jean", "Jeff", "Jeffery", "Jeffrey", "Jennifer", "Jeremy", "Jerry", "Jesse",
                "Jessica", "Jimmy", "Joan", "Joe", "John", "Johnny", "Jonathan", "Jose", "Joseph", "Josephine", "Joshua",
                "Joyce", "Juan", "Judith", "Judy", "Julia", "Julie", "Justin", "Karen", "Katherine", "Kathleen", "Kathryn",
                "Kathy", "Keith", "Kelly", "Kenneth", "Kevin", "Kim", "Kimberly", "Kyle", "Larry", "Laura", "Lawrence",
                "Lee", "Leonard", "Lillian", "Linda", "Lisa", "Lois", "Lori", "Louis", "Louise", "Luis", "Manuel",
                "Margaret", "Maria", "Marie", "Marilyn", "Marjorie", "Mark", "Martha", "Martin", "Marvin", "Mary", "Matthew",
                "Melissa", "Melvin", "Michael", "Michelle", "Mike", "Mildred", "Nancy", "Nathan", "Nicholas", "Nicole",
                "Nik", "Norma", "Norman", "Pamela", "Patricia", "Patrick", "Paul", "Paula", "Peggy", "Peter", "Philip",
                "Phillip", "Phyllis", "Rachel", "Ralph", "Randy", "Raymond", "Rebecca", "Richard", "Rita", "Robert", "Robin",
                "Rodney", "Roger", "Ronald", "Rosa", "Rose", "Roy", "Ruby", "Russell", "Ruth", "Ryan", "Samuel", "Sandra",
                "Sara", "Sarah", "Scott", "Sean", "Shannon", "Sharon", "Shawn", "Sheila", "Sherry", "Shirley", "Stanley",
                "Stephanie", "Stephen", "Steve", "Steven", "Susan", "Sylvia", "Tammy", "Teresa", "Terry", "Thelma",
                "Theresa", "Thomas", "Tiffany", "Timothy", "Tina", "Todd", "Tony", "Tracy", "Travis", "Victor", "Victoria",
                "Vincent", "Virginia", "Walter", "Wanda", "Wayne", "Wendy", "William", "Willie"
            };
        private readonly string[] _lastNames =
            {
                "Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller",
                "Wilson", "Moore", "Taylor", "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin", "Thompson",
                "Garcia", "Martinez", "Robinson", "Clark", "Rodriguez", "Lewis", "Lee", "Walker", "Hall", "Allen", "Young",
                "Hernandez", "King", "Wright", "Lopez", "Hill", "Scott", "Green", "Adams", "Baker", "Gonzalez", "Nelson",
                "Carter", "Mitchell", "Perez", "Roberts", "Turner", "Phillips", "Campbell", "Parker", "Evans", "Edwards",
                "Collins", "Stewart", "Sanchez", "Morris", "Rogers", "Reed", "Cook", "Morgan", "Bell", "Murphy", "Bailey",
                "Rivera", "Cooper", "Richardson", "Cox", "Howard", "Ward", "Torres", "Peterson", "Gray", "Ramirez", "James",
                "Watson", "Brooks", "Kelly", "Sanders", "Price", "Bennett", "Wood", "Barnes", "Ross", "Henderson", "Coleman",
                "Jenkins", "Perry", "Powell", "Long", "Patterson", "Hughes", "Flores", "Washington", "Butler", "Simmons",
                "Foster", "Gonzales", "Bryant", "Alexander", "Russell", "Griffin", "Diaz", "Hayes", "Myers", "Ford",
                "Hamilton", "Graham", "Sullivan", "Wallace", "Woods", "Cole", "West", "Jordan", "Owens", "Reynolds",
                "Fisher", "Ellis", "Harrison", "Gibson", "Mcdonald", "Cruz", "Marshall", "Ortiz", "Gomez", "Murray",
                "Freeman", "Wells", "Webb", "Simpson", "Stevens", "Tucker", "Porter", "Hunter", "Hicks", "Crawford", "Henry",
                "Boyd", "Mason", "Morales", "Kennedy", "Warren", "Dixon", "Ramos", "Reyes", "Burns", "Gordon", "Shaw",
                "Holmes", "Rice", "Robertson", "Hunt", "Black", "Daniels", "Palmer", "Mills", "Nichols", "Grant", "Knight",
                "Ferguson", "Rose", "Stone", "Hawkins", "Dunn", "Perkins", "Hudson", "Spencer", "Gardner", "Stephens",
                "Payne", "Pierce", "Berry", "Matthews", "Arnold", "Wagner", "Willis", "Ray", "Watkins", "Olson", "Carroll",
                "Duncan", "Snyder", "Hart", "Cunningham", "Bradley", "Lane", "Andrews", "Ruiz", "Harper", "Fox", "Riley",
                "Armstrong", "Carpenter", "Weaver", "Greene", "Lawrence", "Elliott", "Chavez", "Sims", "Austin", "Peters",
                "Kelley", "Franklin", "Lawson", "Fields", "Gutierrez", "Ryan", "Schmidt", "Carr", "Vasquez", "Castillo",
                "Wheeler", "Chapman", "Oliver", "Montgomery", "Richards", "Williamson", "Johnston", "Banks", "Meyer",
                "Bishop", "Mccoy", "Howell", "Alvarez", "Morrison", "Hansen", "Fernandez", "Garza", "Harvey", "Little",
                "Burton", "Stanley", "Nguyen", "George", "Jacobs", "Reid", "Kim", "Fuller", "Lynch", "Dean", "Gilbert",
                "Garrett", "Romero", "Welch", "Larson", "Frazier", "Burke", "Hanson", "Day", "Mendoza", "Moreno", "Bowman",
                "Medina", "Fowler", "Brewer", "Hoffman", "Carlson", "Silva", "Pearson", "Holland"
            };
        private readonly IAgentBroker _broker;
        private const string GlimpseCookie = ".Glimpse.Session"; // TODO: Move this somewhere configurable
        private readonly ConcurrentDictionary<string, string> _gravatarCache = new ConcurrentDictionary<string, string>(); 
        private readonly ConcurrentDictionary<string, string> _crcCache = new ConcurrentDictionary<string, string>();
        private readonly IGlimpseContextAccessor _context;

        public UserInspector(IAgentBroker broker, IGlimpseContextAccessor context)
        {
            _broker = broker;
            _context = context;
        }

        public override void Before(HttpContext context)
        {
            var cookieValue = context.Request.Cookies[GlimpseCookie];

            if (string.IsNullOrEmpty(cookieValue))
            {
                var response = context.Features.Get<IHttpResponseFeature>();
                if (response != null && !response.HasStarted)
                {
                    context.Response.Cookies.Append(GlimpseCookie, _context.RequestId.ToString("N"));
                }
            }
        }

        public override void After(HttpContext context)
        {
            var user = context.User;
            var isAnonymous = false;
            var userId = user.FindFirst("sub")?.Value ?? user.FindFirst("NameIdentifier")?.Value;

            if (string.IsNullOrEmpty(userId))
            {
                isAnonymous = true;
                userId = (string)context.Request.Cookies[GlimpseCookie] ?? _context.RequestId.ToString("N");
            }

            var username = user.FindFirst("name")?.Value ?? _crcCache.GetOrAdd(userId, GenerateUsername);
            var email = user.FindFirst("email")?.Value;
            var pic = user.FindFirst("picture")?.Value ?? _gravatarCache.GetOrAdd(email ?? userId, GenerateGravatarUrl);

            _broker.SendMessage(new UserIdentificationMessage(userId, username, email, pic, isAnonymous));
        }

        private string GenerateGravatarUrl(string email)
        {
            var preppedEmail = email.Trim().ToLower();
            var hash = preppedEmail.Md5().ToLower();
            return $"https://www.gravatar.com/avatar/{hash}.jpg?d=identicon&s=80";
        }

        private string GenerateUsername(string seed)
        {
            var hash = seed.Crc24();
            var iTitle = byte.Parse(hash.Substring(0, 2), NumberStyles.HexNumber);
            var iFirstName = byte.Parse(hash.Substring(2, 2), NumberStyles.HexNumber);
            var iLastName = byte.Parse(hash.Substring(4, 2), NumberStyles.HexNumber);

            var builder = new StringBuilder();

            if (iTitle < 192) // name prefix
                builder.Append(_titles[iTitle]);

            builder.Append(_firstNames[iFirstName]);
            builder.Append(_lastNames[iLastName]);

            if (iTitle >= 192) // name suffix
                builder.Append(_titles[iTitle]);

            return builder.ToString().Replace(" ", "");
        }
    }
}
#endif