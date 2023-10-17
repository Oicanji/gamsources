import { useContext, useState } from "react";
import { ThemeContext } from "../../context/Theme";
import { Announcement } from "../../components/announcement/Announcement";
import { TopMenu } from "../../components/top-menu/TopMenu";
import { CollectionForm } from "../../forms/collection/CollectionForm";
import { useParams } from "react-router";
import { CollectionItemForm } from "../../forms/collection/CollectionItemForm";

import "./collection.styles.scss";

const AddCollection = () => {
  const { thisTheme } = useContext(ThemeContext);
  const [collection, setCollection] = useState(undefined);
  const [items, setItems] = useState(undefined);
  const { id } = useParams();
  const [saveItems, setSaveItems] = useState(false);
  const [updateItems, setUpdateItems] = useState(false);

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
      <CollectionForm
        setCollection={setCollection}
        setItems={setItems}
        setSaveItems={setSaveItems}
        updateItems={updateItems}
        setUpdateItems={setUpdateItems}
      />
      {id != undefined && id != 0 && (
        <CollectionItemForm
          collection={collection}
          items={items}
          setItems={setItems}
          saveItems={saveItems}
          setSaveItems={setSaveItems}
          setUpdateItems={setUpdateItems}
        />
      )}
    </div>
  );
};

export default AddCollection;
