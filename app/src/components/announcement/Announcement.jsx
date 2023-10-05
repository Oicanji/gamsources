import { useCallback, useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../context/Theme";
import { getAnnouncement } from "../../api/other/announcement";

export function Announcement() {
  const { thisTheme } = useContext(ThemeContext);
  const [announcement, setAnnouncement] = useState("");

  const callRequest = useCallback(async () => {
    const res = await getAnnouncement();
    if (res.text) {
      setAnnouncement(res.text);
    }
  }, []);

  useEffect(() => {
    callRequest();
  }, [callRequest]);

  return (
    <div
      style={{
        backgroundColor: thisTheme.token.colorPrimary,
        color: thisTheme.token.colorWhite,
        fontWeight: "bold",
        padding: "0.25em",
      }}
    >
      {announcement}
    </div>
  );
}
