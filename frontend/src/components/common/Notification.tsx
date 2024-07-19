import React from 'react'

type NotificationType = 'request' | 'likes' | 'comments' | 'accept';

export type NotificationItem = {
    id: number,
    type: NotificationType,
    personName: string,
    content?: string,
    message?: string
}

type NotificationProps = {
    notification: NotificationItem[]
}



const Notification: React.FC<{ item: NotificationItem }> = ({ item }) => {
    const renderContent = () => {
        switch (item.type) {
            case 'request':
                return (
                    <>
                        <p>{item.personName} requested to connect</p>
                        <div className="mt-2">
                            <button className="bg-teal-500 text-white px-3 py-1 rounded mr-2">Confirm</button>
                            <button className="bg-gray-500 text-white px-3 py-1 rounded">Delete</button>
                        </div>
                    </>
                );
            case 'likes':
                return <p>{item.personName} likes your post</p>;
            case 'comments':
                return <p>{item.personName} commented on your post: {item.content}</p>;
            case 'accept':
                return <p>{item.personName} accepted your request</p>;


        }
    }
    return (
        <div className="p-2 border-b border-gray-700">
            {renderContent()}
        </div>
    );

    
}

const Notifications:React.FC <NotificationProps>=({notification})=>{
    return (
        <div className="bg-black text-white p-4 w-80">
          <h2 className="text-2xl font-bold mb-4">Notifications</h2>
          {notification.map((notification) => (
            <Notification key={notification.id} item={notification} />
          ))}
        </div>
      );

}

export default Notifications