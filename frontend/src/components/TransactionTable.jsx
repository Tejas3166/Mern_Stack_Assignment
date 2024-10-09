import React from "react";
import { Tr, Td, Image } from "@chakra-ui/react";
import Styles from "../AllCss/AllCss.module.css";
const TransactionTable = ({
  _id,
  title,
  description,
  image,
  price,
  sold,
  category,
}) => {
  return (
    <Tr>
      <Td className={Styles.td1}>{_id}</Td>
      <Td className={Styles.td2}>{title}</Td>
      <Td className={Styles.td3}>{description}</Td>
      <Td className={Styles.td4}>{price}</Td>
      <Td className={Styles.td5}>{category}</Td>
      <Td className={Styles.td6}>{sold ? "Sold" : "Not Sold"}</Td>
      <Td className={Styles.td7}>
        <Image src={image} height="6.25rem" width="9.375rem" />
      </Td>
    </Tr>
  );
};

export default React.memo(TransactionTable);
