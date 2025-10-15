import { motion } from 'framer-motion';

const features = [
  {
    title: 'Task Management',
    description: `
      Organize, prioritize, and execute — effortlessly.
      Manage your workflow with flexible Kanban boards, task lists, and timelines that adapt to your team’s needs.
      Set priorities, due dates, and visualize progress in real-time with smart reminders and drag-and-drop organization.
    `,
    highlights: [
      'Customizable boards and task stages',
      'Real-time progress tracking',
      'Smart deadlines and reminders',
      'Easy drag-and-drop organization',
    ],
    image: '/task.jpg',
  },
  {
    title: 'Team Collaboration',
    description: `
      Stay connected, aligned, and in sync — no matter where you work.
      Use comments, mentions, and task discussions to keep context clear.
      Receive instant updates for mentions, file shares, and progress changes.
    `,
    highlights: [
      'Threaded comments and mentions',
      'Real-time updates and activity feeds',
      'Integrated file sharing',
      'Smooth collaboration for distributed teams',
    ],
    image: '/Team.jpg',
  },
  {
    title: 'Smart Analytics',
    description: `
      Turn your team’s activity into actionable insights.
      Track productivity trends, workload balance, and project health.
      Identify bottlenecks early and make data-driven decisions.
    `,
    highlights: [
      'Interactive dashboards',
      'Team performance analytics',
      'Project trend visualization',
      'Exportable progress reports',
    ],
    image: '/analytics.jpg',
  },
];

const FeaturesSection = () => {
  return (
    <div className="w-full bg-[#F8FAFC] py-16">
      <div className="max-w-6xl mx-auto px-6 relative">
        <h2 className="text-3xl font-semibold text-gray-800 mb-16 text-center">
          Powerful Features to Supercharge Your Workflow
        </h2>

        <div className="relative">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className={`relative bg-white shadow-xl rounded-2xl overflow-hidden mb-16 flex flex-col md:flex-row items-center md:items-start md:gap-6 p-6`}
              style={{ zIndex: features.length - idx }}
            >
              {/* Left: Content */}
              <div className="md:w-1/2 flex flex-col justify-center">
                <h3 className="text-2xl font-semibold text-blue-600 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {feature.description}
                </p>
                <ul className="list-disc pl-5 text-gray-700 text-sm space-y-1">
                  {feature.highlights.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Right: Image */}
              <div className="md:w-1/2 h-60 md:h-64 lg:h-80 mt-6 md:mt-0">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="object-cover w-full h-full rounded-xl shadow-md"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
