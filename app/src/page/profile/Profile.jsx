import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../context/Theme";
import { Announcement } from "../../components/announcement/Announcement";
import { TopMenu } from "../../components/top-menu/TopMenu";
import { AuthContext } from "../../context/Auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import apiCollections from "../../api/collection";
import { MessageContext } from "../../context/Message";
import { Typography } from "antd";
import { CollectionCards } from "../../components/collections-cards/CollectionCards";

const Profile = () => {
  const { thisTheme } = useContext(ThemeContext);
  const { message } = useContext(MessageContext);
  const { user, auth } = useContext(AuthContext);
  console.log(user);

  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(50);
  const [haveMore, setHaveMore] = useState(false);

  const [myCollections, setMyCollections] = useState([]);

  async function getMyCollection() {
    try {
      const res = await apiCollections.me(offset, limit, auth);
      if (res.data.collections.length == 0) {
        console.log("aaaaa");
        setHaveMore(false);
      } else {
        var response = res.data.collections;
        console.log(response);
        response.pop();
        console.log(response);
        setMyCollections([...myCollections, ...response]);
        setHaveMore(true);
        setOffset(offset + limit);
        setLimit(limit);
      }
    } catch (err) {
      message.catch(err);
    }
  }

  useEffect(() => {
    getMyCollection();
  }, []);

  return (
    <div
      style={{
        display: "block",
        textAlign: "center",
        backgroundColor: thisTheme.token.colorBgLayout,
        color: thisTheme.token.colorText,
        minHeight: "100vh",
      }}
    >
      <Announcement />
      <TopMenu />
      <div
        style={{
          padding: "20px",
          paddingLeft: "50px",
          backgroundColor: thisTheme.token.colorBgBase,
          borderRadius: "5px",
          margin: "10px",
          display: "flex",
          gap: "4rem",
        }}
      >
        <h1
          style={{
            color: thisTheme.token.colorPrimary,
          }}
        >
          {" "}
          Profile:{" "}
        </h1>
        <h3
          style={{
            marginTop: "30px",
          }}
        >
          Username: {user.username} <FontAwesomeIcon icon={faEdit} />
        </h3>
        <h3
          style={{
            marginTop: "30px",
          }}
        >
          Email: {user.email} <FontAwesomeIcon icon={faEdit} />
        </h3>
      </div>

      <div
        style={{
          padding: "10px",
          backgroundColor: thisTheme.token.colorBgBase,
          borderRadius: "5px",
          margin: "10px",
        }}
      >
        <Typography.Title
          level={2}
          style={{
            textAlign: "left",
            paddingLeft: "40px",
          }}
        >
          My Collections
        </Typography.Title>
        <br />
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            justifyItems: "center",
            gap: "3rem",
          }}
        >
          {myCollections.map((collection) => (
            <CollectionCards data={collection} />
          ))}
        </div>
        {myCollections.length == 0 && (
          <p
            style={{
              color: thisTheme.token.colorPrimary,
              fontSize: "1.5rem",
            }}
          >
            You don't have any collections yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default Profile;
