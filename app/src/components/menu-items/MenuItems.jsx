import Sider from "antd/es/layout/Sider";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserTie,
  faHouse,
  faMagnifyingGlass,
  faLayerGroup,
  faUser,
  faUsers,
  faTag,
} from "@fortawesome/free-solid-svg-icons";
import { Divider, Menu } from "antd";
import { useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";

const menus = {
  "/": "home",
  "/search": "search",
  "/collection-view": "collection-view",
  "/collection/": "collection",
  "/profile": "profile",
  "/tag/add": "tag",
  "/social/add": "social",
};

export function MenuItems({ theme }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // if path name have a /collection/ indepents to ID
  const [url, setUrl] = useState(
    pathname.includes("/collection/") ? "/collection/" : pathname
  );

  useEffect(() => {
    setUrl(pathname.includes("/collection/") ? "/collection/" : pathname);
  }, [pathname]);

  return (
    <Sider
      trigger={null}
      style={{
        backgroundColor: theme.token.colorBgBase,
        color: theme.token.colorText,
        borderRight: "1px solid " + theme.token.colorBorder,
      }}
    >
      <div
        className="demo-logo-vertical"
        style={{
          color: theme.token.colorPrimary,
          textAlign: "center",
          padding: "0.8rem 0",
          fontSize: "1.3rem",
        }}
      >
        <FontAwesomeIcon
          icon={faUserTie}
          style={{
            fontSize: "2.2rem",
          }}
        />
        <span
          style={{
            marginLeft: "0.8rem",
          }}
        >
          Admin Mode{" "}
        </span>
      </div>
      <Divider
        style={{
          marginTop: "0.5rem",
        }}
      />
      <Menu
        style={{
          backgroundColor: theme.token.colorBgBase,
          borderRight: "1px solid " + theme.token.colorBgBase,
        }}
        mode="inline"
        defaultSelectedKeys={menus[url]}
        items={[
          {
            key: "home",
            icon: <FontAwesomeIcon icon={faHouse} />,
            label: "Home Page",
            onClick: () => {
              if (menus[url] === "home") return;
              navigate("/");
            },
          },
          {
            key: "search",
            icon: <FontAwesomeIcon icon={faMagnifyingGlass} />,
            label: "Search Page ",
            onClick: () => {
              if (menus[url] === "search") return;
              navigate("/search");
            },
          },
          {
            key: "collection-view",
            icon: <FontAwesomeIcon icon={faLayerGroup} />,
            label: "Collection view",
            onClick: () => {
              if (menus[url] === "collection-view") return;
              navigate("/collection-view");
            },
          },
          {
            key: "collection",
            icon: <FontAwesomeIcon icon={faLayerGroup} />,
            label: "Collection",
            onClick: () => {
              if (menus[url] === "collection") return;
              navigate("/collection/0");
            },
          },
          {
            key: "profile",
            icon: <FontAwesomeIcon icon={faUser} />,
            label: "My Profile",
            onClick: () => {
              if (menus[url] === "profile") return;
              navigate("/profile");
            },
          },
        ]}
      />
      <Divider>Administer</Divider>

      <Menu
        style={{
          backgroundColor: theme.token.colorBgBase,
          borderRight: "1px solid " + theme.token.colorBgBase,
        }}
        mode="inline"
        defaultSelectedKeys={menus[url]}
        items={[
          {
            key: "tag",
            icon: <FontAwesomeIcon icon={faTag} />,
            label: "Tag add",
            onClick: () => {
              if (menus[url] === "tag") return;
              navigate("/tag/add");
            },
          },
          {
            key: "social",
            icon: <FontAwesomeIcon icon={faUsers} />,
            label: "Social add",
            onClick: () => {
              if (menus[url] === "social") return;
              navigate("/social/add");
            },
          },
        ]}
      />
    </Sider>
  );
}
