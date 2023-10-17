import { useContext } from "react";
import { ThemeContext } from "../../context/Theme";
import { Announcement } from "../../components/announcement/Announcement";
import { TopMenu } from "../../components/top-menu/TopMenu";

import { Divider, Typography } from "antd";

const Terms = () => {
  const { thisTheme } = useContext(ThemeContext);
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
          padding: "10px",
          backgroundColor: thisTheme.token.colorBgBase,
          borderRadius: "5px",
          margin: "10px",
        }}
      >
        <Typography.Title>Gamsources - Terms of Use</Typography.Title>
        <Divider />
        <Typography.Paragraph strong>
          Last updated: 2023-10-17
        </Typography.Paragraph>
        <br />
        <div
          style={{
            margin: "0 20%",
            textAlign: "left",
          }}
        >
          <Typography.Title level={3}>1. Introduction</Typography.Title>
          <Typography.Text>
            Welcome to Gamsources, an open-source application dedicated to
            sharing copyright-free content for games, videos, and other creative
            purposes. The following terms of use govern the use of this
            application. By using Gamsources, you agree to comply with these
            terms. If you do not agree with them, please do not use the
            application.
          </Typography.Text>
          <br />
          <Typography.Title level={3}>2. User Content</Typography.Title>
          <Typography.Text>
            2.1. Users of Gamsources may only upload and share content that is
            under the Creative Commons license (CC BY 3.0 or 4.0).
          </Typography.Text>
          <Typography.Text>
            2.2. By using the content available on Gamsources, you agree to
            abide by the specific license terms associated with that content.
          </Typography.Text>
          <Typography.Text>
            2.3. When using content shared by other users, you agree to provide
            proper attribution to the original creator as required by the
            Creative Commons license.
          </Typography.Text>
          <Typography.Text>
            2.4. Uploading content that is not under the CC BY license or
            violates copyrights is not permitted.
          </Typography.Text>
          <br />
          <Typography.Title level={3}>
            3. Copyright Violation Reports
          </Typography.Title>
          <Typography.Text>
            If you believe that a Gamsources user is infringing upon your
            copyrights, please contact us via email at "gamsources@gmail.com."
            We will do our best to review and resolve the report within 48
            hours.
          </Typography.Text>
          <br />
          <Typography.Title level={3}>
            4. Sensitive Content and Limitations
          </Typography.Title>
          <Typography.Text>
            4.1. Users may post AI-generated or sensitive content, such as
            adult-themed content, as long as it is appropriately labeled and
            does not violate applicable laws or include material related to
            crime, drugs, bullying, racial offenses, or malicious files.
          </Typography.Text>
          <Typography.Text>
            4.2. Gamsources reserves the right to remove any content that
            violates these guidelines or is deemed inappropriate.
          </Typography.Text>
          <br />
          <Typography.Title level={3}>
            5. Privacy and Personal Data
          </Typography.Title>
          <Typography.Text>
            5.1. Data collected by Gamsources is used only as identifiers and
            should not include real personal information, such as name, gender,
            religion, or political orientation.
          </Typography.Text>
          <br />
          <Typography.Title level={3}>6. Penalties</Typography.Title>
          <Typography.Text>
            6.1. In the event of a breach of the terms of use, Gamsources
            reserves the right to remove content, block users, and take legal
            action in cases of repeat offenses.
          </Typography.Text>
          <br />
          <Typography.Title level={3}>7. Conclusion</Typography.Title>
          <Typography.Text>
            By using Gamsources, you agree to the terms of use as stated here.
            These terms may be updated from time to time, and it is the user's
            responsibility to check for changes. If you do not agree with the
            changes, it is recommended that you discontinue using the
            application.
          </Typography.Text>
        </div>
        <br />
        <br />
        <br />
        <Typography.Link href="https://creativecommons.org/licenses/by/4.0/">
          Learn more about the Creative Commons license and its terms of use.
        </Typography.Link>
        <br />
        <br />
        <Typography.Link href="https://github.com/Oicanji/gamsources">
          Learn more to project
        </Typography.Link>
        <br />
        <br />
        <br />
      </div>
    </div>
  );
};

export default Terms;
