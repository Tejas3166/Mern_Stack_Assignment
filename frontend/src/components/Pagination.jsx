import React, { useEffect, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";

const Pagination = ({ page, setPage }) => {
  const [disabled, setDisabled] = useState(false);
  const [incdisabled, setIncdisabled] = useState(false);
  useEffect(() => {
    if (page <= 1) {
      setDisabled(true);
    } else if (page >= 4) {
      setIncdisabled(true);
    } else {
      setDisabled(false);
    }
  }, [page]);
  return (
    <Box display={{ md: "block", sm: "none", base: "none" }}>
      <Flex className="w-[70%] m-[auto] justify-between		items-center gap-[0.625rem] p-[0.625rem]">
        <button
          className="bg-[#8b2b3a] py-1.5 px-6 rounded-md text-white cursor-pointer"
          onClick={() => setPage(page - 1)}
          disabled={disabled}
        >
          PREV
        </button>
        <h1 style={{ color: "black" }}>{page}</h1>
        <button
          className="bg-[#8b2b3a] py-1.5 px-6 rounded-md text-white cursor-pointer"
          onClick={() => setPage(page + 1)}
          disabled={incdisabled}
        >
          NEXT
        </button>
      </Flex>
    </Box>
  );
};

export default Pagination;
