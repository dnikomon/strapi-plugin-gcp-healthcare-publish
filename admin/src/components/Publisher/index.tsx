import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "@strapi/helper-plugin";
import { useIntl } from "react-intl";
import { Box } from "@strapi/design-system/Box";
import { Stack } from "@strapi/design-system/Stack";
import { Divider } from "@strapi/design-system/Divider";
import { Typography } from "@strapi/design-system/Typography";
import { Textarea } from '@strapi/design-system/Textarea';
import { Button } from "@strapi/design-system/Button";
import { Badge } from "@strapi/design-system/Badge";
import Strapi from "strapi-sdk-js";


// .find("*", { }).then(res => {
// }).catch(e => {

// })

// approvalStatus: null
// author: {id: '<any ID like value>', name: 'Joe Doe', email: 'jdoe@sample.com', avatar: '<any image url>'}
// blockReason: null
// blocked: false
// blockedThread: false
// children: []
// content: "My sample response"
// createdAt: "2022-05-31T15:00:03.862Z"
// gotThread: false
// id: 1
// removed: null


const Versions = (...rest) => {
  const getUserInfo = auth.getUserInfo()
  const strapi = new Strapi()
  const token = 'ace22a649639f65d36944c1a56e935ab371d4493cf49c1f0abcdff03f86a7af8c2067678d8fff33a7c217eda4b16884698b804526b83aae9026b7e3cf16dc20368dc921f6b067bb81a77283cb4cea730afaeac6791b979f16360e868770b29911d8fac431e1b5e25d77f6185093978926394ea6fbc43affc75a16d30e0720cbb'
  const { id, firstname, lastname, email } = auth.getUserInfo()
  strapi.axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  const { push, replace } = useHistory();
  useEffect(() => {
    strapi.axios.get('http://localhost:1337/api/comments/api::alias.alias:2039').then(res => {
      setData(res.data)
    })
  }, [])
  const [data, setData] = useState([]);
  const [content, setContent] = useState('');

    useEffect(() => {

    }, [data, content])
  // const handleChange = useCallback(
  //   (value) => {
  //     if (!value) {
  //       return;
  //     }

  //     const selectedVersion = data.find((v) => v.versionNumber === value);

  //     push({
  //       pathname: `/content-manager/collectionType/${slug}/${selectedVersion.id}`,
  //     });
  //   },
  //   [data, push, slug]
  // );

  const onSaveClick = useCallback(async () => {

    try {
      const { data } = await strapi.axios.post('http://localhost:1337/api/comments/api::alias.alias:2039',
      { content,
        author: {
          id,
          name: `${firstname} ${lastname}`,
          email,
          avatar: "",
        }
      })
      setContent('')
      setData((prev) => [...prev, { content,
        author: {
          id,
          name: `${firstname} ${lastname}`,
          email,
          avatar: "",
        }
      }])
    } catch (e) {
    }
  }, [push, content, data]);

  return (
    <Box
      as="aside"
      aria-labelledby="versioning-informations"
      background="neutral0"
      borderColor="neutral150"
      hasRadius
      paddingBottom={4}
      paddingLeft={4}
      paddingRight={4}
      paddingTop={6}
      shadow="tableShadow"
    >
      <Typography
        variant="sigma"
        textColor="neutral600"
        id="versioning-informations"
      >
        Comments
      </Typography>
      <Box paddingTop={2} paddingBottom={6}>
        <Divider />
      </Box>
      <Box paddingTop={2} paddingBottom={6}>
          {data.map(comment =>
              <Stack spacing={2}>
              <h3><Badge>{comment.author.name}</Badge>{comment.content}</h3>
              </Stack>
          )}
      </Box>
      <Box paddingTop={2} paddingBottom={6}>
        <Divider />
      </Box>

      <Box paddingTop={2} paddingBottom={6}>
      <Textarea placeholder="Please leave a comment" type="text" aria-label="comment" name="comment" onChange={(e) => {
        setContent(e.target.value)

      }} value={content}/>
        <Button variant="secondary" fullWidth onClick={onSaveClick}>
         Submit
        </Button>
      </Box>
    </Box>
  );
};

export default Versions;
