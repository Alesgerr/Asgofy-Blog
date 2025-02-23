import { useEffect, useState } from "react";

const NotifyOnPublish = ({ url, type }) => {
  const [notified, setNotified] = useState(false);
   
  useEffect(() => {
    if (!notified) {
      const sendNotification = async () => {
        try {
          await fetch("/api/indexing", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              url: url,
              type: type, // URL_UPDATED
            }),
          });
          setNotified(true); // Bildirim gönderildi, artık tekrar etmesin
          console.log("Google'a bildirim gönderildi.");
        } catch (error) {
          console.error("Bildirim gönderilirken hata oluştu:", error);
        }
      };

      sendNotification();
    }
  }, [url, type, notified]);

  return null;
};

export default NotifyOnPublish;
