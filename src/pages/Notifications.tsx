/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Bell,
  CalendarClock,
  Check,
  ClipboardList,
  Info,
  UserPlus,
  X,
} from 'lucide-react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import {
  markAsRead,
  removeNotification,
  setNotifications,
} from '../redux/notificationSlice';
import {
  acceptInvitation,
  getNotifications,
} from '../services/notificationService';

export const Notifications = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const notifications = useSelector(
    (state: RootState) => state.notification.list
  );

  // Fetch notifications from backend once
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await getNotifications(currentUser.id);
        dispatch(setNotifications(res));
      } catch (err) {
        console.error('Error fetching notifications:', err);
      }
    };
    if (currentUser?.id) fetchNotifications();
  }, [currentUser, dispatch]);

  const handleAccept = async (id: string, notificationId: string) => {
    try {
      await acceptInvitation(id, currentUser.id);
      dispatch(removeNotification(notificationId));
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async (id: string) => {
    console.log('Rejected invitation', id);
    dispatch(removeNotification(id));
  };

  // Pick icons
  const getIcon = (type: string) => {
    switch (type) {
      case 'INVITE':
        return <UserPlus className="text-blue-500" size={22} />;
      case 'PROJECT_ASSIGN':
        return <ClipboardList className="text-green-500" size={22} />;
      case 'DUE_DATE':
        return <CalendarClock className="text-orange-500" size={22} />;
      default:
        return <Info className="text-gray-500" size={22} />;
    }
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <Bell className="text-indigo-500" size={26} />
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
          Notifications
        </h1>
      </div>
      {/* Empty state */}
      {notifications?.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          No new notifications 🎉
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {notifications?.map((n: any) => (
            <div
              key={n.id}
              className={`border border-gray-200 dark:border-zinc-700 ${
                n.isRead
                  ? 'bg-gray-100 dark:bg-zinc-800'
                  : 'bg-white dark:bg-zinc-800'
              } rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200`}
            >
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex gap-3 items-start">
                  <div className="mt-1">{getIcon(n.type)}</div>
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-gray-100 capitalize">
                      {n.title || n.type.replace('_', ' ')}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(n.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Message */}
              <p className="text-gray-700 dark:text-gray-300 mt-3 leading-relaxed">
                {n.message}
              </p>

              {/* Actions based on type */}
              {n.type === 'INVITE' && (
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => handleAccept(n.invitationId, n.id)}
                    className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-all"
                  >
                    <Check size={16} /> Accept
                  </button>
                  <button
                    onClick={() => handleReject(n.id)}
                    className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-all"
                  >
                    <X size={16} /> Reject
                  </button>
                </div>
              )}

              {n.type === 'PROJECT_ASSIGN' && (
                <button
                  onClick={() => {
                    console.log('View Project');
                    dispatch(markAsRead(n.id));
                  }}
                  className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-all"
                >
                  View Project
                </button>
              )}

              {n.type === 'DUE_DATE' && (
                <button
                  onClick={() => console.log('Open Task')}
                  className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-all"
                >
                  View Task
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
