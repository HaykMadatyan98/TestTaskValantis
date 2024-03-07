import './App.css';
import {useEffect, useState} from "react";

import ProductsTable from "./components/Table/ProductsTable";
import Pagination from "./components/Pagination/Pagination";

import {getProducts} from "./helpers/functions";
import Loading from "./components/Loading/Loading";

function App() {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const limit = 50;
    const [loading, setLoading] = useState(false);
    const [filterByName, setName] = useState('')
    const [filterByPrice, setPrice] = useState(0)
    const [filterByBrand, setBrand] = useState('')

    const handlePageChange = (page) => {
        setPage(page);
    };

    const handleFilterPage = (field, value) => {
        switch (field) {
            case "name":
                setName(value)
                break;
            case "price":
                setPrice(value)
                break;
            case "brand":
                setBrand(value)
                break;
        }
    }

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            try {
                let params = null
                if (filterByName || filterByPrice || filterByBrand) {
                    params = {
                        "product": filterByName,
                        "price": filterByPrice,
                        "brand": filterByBrand
                    }
                }
                const fetchedData = await getProducts(page, limit, params);
                setProducts(fetchedData);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        getData();
    }, [page, limit, filterByName, filterByPrice, filterByBrand]);

    return (
        <div className="App">
            <div className="min-h-[458px] flex items-center justify-center w-full">
                {loading && <Loading/>}
                {!loading && <ProductsTable data={products} filter={handleFilterPage}/>}
            </div>
            <Pagination currentPage={page} onPageChange={handlePageChange}/>
        </div>
    );
}

export default App;