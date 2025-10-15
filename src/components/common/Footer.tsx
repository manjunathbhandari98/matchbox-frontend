import { Link } from 'react-router-dom';
import colors from '../../constants/colors';

const Footer = () => {
  const footerOptions = [
    {
      title: 'Company',
      options: [
        { option: 'About Us', link: '/about-us' },
        { option: 'Careers', link: '/careers' },
        { option: 'Contact Us', link: '/contact-us' },
        { option: 'Press', link: '/press' },
        { option: 'Blog', link: '/blog' },
        { option: 'Leadership', link: '/leadership' },
      ],
    },
    {
      title: 'Support',
      options: [
        { option: 'Privacy Policy', link: '/privacy-policy' },
        { option: 'Terms of Service', link: '/terms' },
        { option: 'FAQ', link: '/faq' },
        { option: 'Help Center', link: '/help-center' },
        { option: 'Report an Issue', link: '/report-issue' },
      ],
    },
    {
      title: 'Resources',
      options: [
        { option: 'Community', link: '/community' },
        { option: 'Guides', link: '/guides' },
        { option: 'Tech Support', link: '/support' },
        { option: 'API Documentation', link: '/api-docs' },
        { option: 'Developers', link: '/developers' },
        { option: 'Tutorials', link: '/tutorials' },
      ],
    },
    {
      title: 'Products',
      options: [
        { option: 'Features', link: '/features' },
        { option: 'Pricing', link: '/pricing' },
        { option: 'Integrations', link: '/integrations' },
        { option: 'Enterprise', link: '/enterprise' },
        { option: 'Free Trial', link: '/free-trial' },
      ],
    },
    {
      title: 'Social',
      options: [
        { option: 'Twitter', link: 'https://twitter.com' },
        { option: 'Facebook', link: 'https://facebook.com' },
        { option: 'LinkedIn', link: 'https://linkedin.com' },
        { option: 'Instagram', link: 'https://instagram.com' },
        { option: 'YouTube', link: 'https://youtube.com' },
      ],
    },
  ];

  return (
    <div className="flex justify-around p-3">
      <div className="flex flex-col gap-4 items-center">
        <img src="/matchbox-logo-new.png" alt="logo" className="w-10 h-10" />
        <h2 className="text-xl font-semibold tracking-tight source-serif ">
          <span>Match</span>
          <span style={{ color: colors.primary }}>Box</span>
        </h2>
        <p className="font-medium text-xs">Work smarter, together.</p>
      </div>
      {footerOptions.map((option, index) => (
        <div key={index}>
          <h2 className="font-bold text-sm">{option.title}</h2>
          <div className="flex flex-col gap-5 mt-10">
            {option.options.map((opt, i) => (
              <Link
                to={opt.link}
                key={i}
                className=" hover:opacity-100 text-xs opacity-75 font-semibold"
              >
                {opt.option}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Footer;
