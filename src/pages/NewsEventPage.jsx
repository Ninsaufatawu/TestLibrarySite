
import { MdEventAvailable } from 'react-icons/md';
import SideBar from '../components/SideBar';

const articles = [
  {
    title: "Health Advances for the 50+ Age Group",
    tag: "News",
    content: `
      Recent studies have shown significant advancements in healthcare for those aged 50 and above. Medical researchers have developed new treatments for chronic conditions such as arthritis, diabetes, and heart disease. With personalized medicine becoming more accessible, people in this age group can expect more targeted therapies that improve their quality of life. Additionally, innovations in wearable health technology are helping individuals monitor their health in real time, allowing for early detection of potential issues.
    `,
  },
  {
    title: "Social Security Updates and What They Mean for You",
    tag: "News",
    content: `
      The Social Security Administration recently announced changes to benefit calculations, which could impact millions of Americans aged 50 and older. The cost-of-living adjustment (COLA) for 2024 is expected to increase by 3%, providing additional financial relief. However, there are also discussions about potential changes to the full retirement age and tax implications for higher-income beneficiaries. It's important for individuals approaching retirement to stay informed and consider how these changes might affect their financial planning.
    `,
  },
  {
    title: "Trends in Senior Housing: What to Expect in the Coming Years",
    tag: "News",
    content: `
      As the demand for senior housing increases, new trends are emerging in the industry. Many communities are now focusing on creating more affordable and adaptable living spaces for people aged 50 and above. These include smaller, energy-efficient homes, as well as multigenerational housing options that allow older adults to live with family members. Additionally, there is a growing emphasis on community engagement and access to amenities such as fitness centers, cultural activities, and healthcare services.
    `,
  },
  {
    title: "Technology Bridging the Generational Gap",
    tag: "News",
    content: `
      With the rapid advancement of technology, many tools and platforms are now being designed specifically with older adults in mind. From simplified smartphones and tablets to online platforms that facilitate social connections, technology is helping to bridge the generational gap. Virtual reality is also being used in therapeutic settings, providing cognitive stimulation and reducing feelings of isolation. As technology continues to evolve, it will play an increasingly important role in the lives of those aged 50 and above.
    `,
  },
  {
    title: "Understanding the Latest Changes in Medicare",
    tag: "News",
    content: `
      Medicare is undergoing several important changes that could affect individuals aged 50 and over. The introduction of new coverage options, adjustments to premiums, and changes in drug pricing are all factors that need to be considered. Additionally, telehealth services have been expanded under Medicare, providing more convenient access to medical care. Understanding these changes is crucial for making informed decisions about healthcare in retirement.
    `,
  },
  {
    title: "Annual 50+ Wellness Fair",
    tag: "Event",
    content: `
      The Annual 50+ Wellness Fair is set to take place this October, offering a variety of health screenings, workshops, and fitness demonstrations specifically tailored to individuals aged 50 and above. Attendees can explore the latest in nutrition, exercise, and mental health, and even receive one-on-one consultations with healthcare professionals. This event is a great opportunity to stay informed about health trends and connect with others in the community.
    `,
  },
  {
    title: "Senior Arts & Crafts Festival",
    tag: "Event",
    content: `
      The Senior Arts & Crafts Festival is an event not to be missed by those with a creative flair. Taking place in November, this festival will showcase the talents of artists aged 50 and over, featuring everything from paintings and sculptures to handmade jewelry and textiles. Attendees can participate in workshops, meet the artists, and even purchase unique pieces to take home. It’s a wonderful opportunity to celebrate creativity and find inspiration.
    `,
  },
  {
    title: "Travel Expo for the 50+ Community",
    tag: "Event",
    content: `
      This year’s Travel Expo is dedicated to the 50+ community, offering exclusive deals and travel packages designed with older adults in mind. The event will include presentations from travel experts on the best destinations for senior travelers, tips for staying healthy on the go, and information about travel insurance options. Whether you’re planning a relaxing beach getaway or an adventurous trip abroad, this expo will provide all the resources you need.
    `,
  },
  {
    title: "Senior Sports & Fitness Day",
    tag: "Event",
    content: `
      The Senior Sports & Fitness Day is an annual event focused on promoting physical activity and well-being among the 50+ age group. The event will feature a range of activities, including yoga sessions, walking tours, and team sports like pickleball and bocce. Participants will have the opportunity to engage in friendly competition, learn new exercises, and meet others who share a passion for staying active. It’s a day full of energy, motivation, and fun.
    `,
  },
  {
    title: "Financial Planning Workshop for 50+",
    tag: "Event",
    content: `
      Financial planning is crucial at any age, but it becomes even more important as retirement approaches. This workshop, tailored for those aged 50 and above, will cover essential topics such as investment strategies, estate planning, and managing retirement income. Expert financial advisors will be on hand to answer questions and provide personalized advice. Whether you’re just starting to think about retirement or are already retired, this workshop will offer valuable insights to help you secure your financial future.
    `,
  },
  // Additional Content Below:
  {
    title: "Volunteer Opportunities for the 50+ Community",
    tag: "Event",
    content: `
      The Volunteer Expo for the 50+ community is an excellent way to give back and stay active. Organizations from across various sectors will present volunteer opportunities that cater to the skills and passions of older adults. Whether you're interested in education, environmental work, or helping vulnerable populations, this expo will provide connections to roles that allow you to make a positive impact.
    `,
  },
  {
    title: "50+ Tech Learning Sessions",
    tag: "Event",
    content: `
      These monthly tech learning sessions are designed to help individuals aged 50+ better understand how to use modern technology. From mastering smartphones to navigating social media, these workshops provide hands-on experience with experienced instructors. These sessions will also offer insights into online safety and how to stay connected with family and friends through tech.
    `,
  },
  {
    title: "Retirement Investment Seminar",
    tag: "Event",
    content: `
      Hosted by financial experts, this seminar will focus on investment strategies tailored for individuals in or nearing retirement. Topics will include managing risk, diversifying portfolios, and optimizing retirement income streams. Attendees can also have one-on-one sessions with certified financial planners to discuss personal finance questions.
    `,
  },
  {
    title: "Caregiving and Family Support Conference",
    tag: "Event",
    content: `
      This conference addresses the unique challenges faced by older adults who are caregivers for their spouses or aging parents. Experts in healthcare and family support services will offer advice and guidance on how to balance caregiving with personal well-being. Breakout sessions will cover legal considerations, emotional health, and available resources for caregivers.
    `,
  }
];


export const NewsEventPage = () => {
  return (
    <div className='flex flex-col md:flex-row bg-gray-100 dark:bg-gray-900'>
      <div className='md:fixed'>
        <SideBar />
      </div>
      <div className="p-10 dark:bg-gray-800 dark:text-white md:pl-80 w-full">
        <h1 className="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-3">
          <div className='pt-1'>
            <MdEventAvailable className="text-3xl" />
          </div>
          <span>News & Events</span>
        </h1>

        {/* Render News Section */}
        <div className="mb-10">
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-300">News</h2>
          {articles.filter(article => article.tag === 'News').map((article, index) => (
            <div key={index} className="mb-6 p-4 bg-white dark:bg-gray-700 rounded-lg shadow-md">
              <h3 className="text-lg md:text-xl font-bold text-gray-800 dark:text-white">{article.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{article.content}</p>
            </div>
          ))}
        </div>

        {/* Render Events Section */}
        <div>
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-300">Events</h2>
          {articles.filter(article => article.tag === 'Event').map((article, index) => (
            <div key={index} className="mb-6 p-4 bg-white dark:bg-gray-700 rounded-lg shadow-md">
              <h3 className="text-lg md:text-xl font-bold text-gray-800 dark:text-white">{article.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{article.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


