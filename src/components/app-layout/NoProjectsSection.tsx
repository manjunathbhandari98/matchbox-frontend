import { Plus } from 'lucide-react';
import colors from '../../constants/colors';
import CommonButton from '../ui/CommonButton';

const NoProjectsSection = ({
  title,
  desc,
  onCreate,
}: {
  title: string;
  desc: string;
  onCreate: () => void;
}) => (
  <div className="flex flex-col items-center justify-center py-16 text-center">
    <div className="bg-blue-100 dark:bg-blue-900/40 p-6 rounded-full mb-6 shadow-sm">
      <Plus className="text-blue-600 dark:text-blue-400 w-10 h-10" />
    </div>
    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
      {title}
    </h2>
    <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md">{desc}</p>
    <CommonButton
      text="Create Project"
      icon={<Plus />}
      borderColor={colors.primaryDark}
      bgColor="blue"
      size="md"
      rounded="lg"
      onClick={onCreate}
    />
  </div>
);

export default NoProjectsSection;
