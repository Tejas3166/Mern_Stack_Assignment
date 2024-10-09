import {
  Box,
  Button,
  Center,
  Flex,
  SimpleGrid,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import TransactionTable from "../components/TransactionTable";
import { Table, Thead, Tbody, Tr, Th, TableContainer } from "@chakra-ui/react";
import Pagination from "../components/Pagination";
import { Accoding_Month, AllData, Searching_Data } from "../Redux/action";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SelectTag from "../components/SelectTag";
import MonthModal from "../components/MonthModal";
import TransactionCard from "../components/TransactionCard";
import { IoMdArrowDropright } from "react-icons/io";
import { IoMdArrowDropleft } from "react-icons/io";
const Home = () => {
  const isLargeScreen = useBreakpointValue({ base: false, lg: true });
const [search, setSearch] = useState("");
const id = React.useRef();
const { Transactions, loading } = useSelector(
    (details) => ({
      Transactions: details.TransactionData.data,
      loading: details.TransactionData.loading,
    }),
    shallowEqual
  );
  const [page, setPage] = useState(1);
  const [disabled, setDisabled] = useState(false);
  const [incdisabled, setIncdisabled] = useState(false);
  const limit = useRef(10);
  const dispatch = useDispatch();
  useEffect(() => {
    if (search === "") {
      dispatch(AllData(page, limit.current));
    } else {
      dispatch(Searching_Data(search));
    }
    if (page) {
      if (page <= 1) {
        setDisabled(true);
      } else if (page >= 4) {
        setIncdisabled(true);
      } else {
        setDisabled(false);
      }
    }
  }, [search, page]);

  const handleChange = (e) => {
    const { value } = e.target;

    if (id.current) clearTimeout(id.current);
    id.current = setTimeout(() => {
      setSearch({ ...search, value });
    }, 1000);
  };
  const handleMonth = (e) => {
    dispatch(Accoding_Month(e.target.value));
  };

  return (
    <Box className="min-h-[70vh] lg:min-w-[78vw] md:min-w-[95vw] sm:min-w-[100vw] min-w-[100vw] shadow-2xl m-auto bg-white mt-2">
      <Box className="m-auto md:w-[95%] sm:w-[100%]">
        <Flex className="justify-between items-center p-4">
          <Flex className="justify-center	items-center gap-2.5">
            <FaUserCircle className="text-3xl text-[#1d4ed8]" />
            <Text className="text-lg text-slate-600">Transactions</Text>
          </Flex>
          <input
            type="text"
            className="rounded-md md:py-2 md:px-6 shadow-md hidden md:block"
            placeholder="Search..."
            onChange={handleChange}
          />

          <Box gap={8} display={{ lg: "flex", sm: "none", base: "none" }}>
            <SelectTag name="Select Month" fun={handleMonth} />
            <MonthModal />
          </Box>
          <Link to="/chart" className="w-20">
            <Button colorScheme="whatsapp" w="100%">
              Stats
            </Button>
          </Link>
        </Flex>

        <Box
          gap={8}
          justifyContent={"flex-end"}
          display={{ lg: "none", sm: "flex", base: "flex" }}
          mt={2}
        >
          <SelectTag name="Select Month" fun={handleMonth} />
          <MonthModal />
        </Box>

        {!isLargeScreen && (
          <>
            <Center>
              <input
                type="text"
                className="rounded-md p-3 shadow-md m-auto mt-5 w-[90%]"
                placeholder="Search..."
                onChange={handleChange}
              />
            </Center>

            <Flex
              justifyContent={"flex-end"}
              alignContent={"center"}
              mt={5}
              gap={".8rem"}
              fontSize={"2rem"}
              cursor={"pointer"}
            >
              <Text fontSize={"1.2rem"}>{page} of 4</Text>
              <Box
                _hover={{ background: "gray" }}
                onClick={() => !disabled && setPage(page - 1)}
                borderRadius={"100%"}
              >
                <IoMdArrowDropleft />
              </Box>
              <Box
                _hover={{ background: "gray" }}
                borderRadius={"100%"}
                onClick={() => !incdisabled && setPage(page + 1)}
              >
                <IoMdArrowDropright />
              </Box>
            </Flex>
          </>
        )}

        {loading ? (
          <Center className="mt-12">...Loading</Center>
        ) : (
          <>
            {isLargeScreen ? (
              <TableContainer
                mt="1.4rem"
                // display={{ md: "block", sm: "none", base: "none" }}
              >
                <Table>
                  <Thead>
                    <Tr>
                      <Th>ID</Th>
                      <Th>Title</Th>
                      <Th>Description</Th>
                      <Th>Price</Th>
                      <Th>Category</Th>
                      <Th>Sold</Th>
                      <Th>Image</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {Transactions.length > 0 &&
                      Transactions.map((ele, i) => (
                        <TransactionTable key={i} {...ele} />
                      ))}
                  </Tbody>
                </Table>
              </TableContainer>
            ) : (
              <SimpleGrid
                columns={[1, 2, null]}
                spacing={{ md: "40px", base: "20px" }}
                w={"90%"}
                margin={"auto"}
                mt={6}
              >
                {Transactions.length > 0 &&
                  Transactions.map((ele, i) => (
                    <TransactionCard key={i} {...ele} />
                  ))}
              </SimpleGrid>
            )}
            {isLargeScreen && <Pagination page={page} setPage={setPage} />}
          </>
        )}
      </Box>
    </Box>
  );
};

export default Home;
