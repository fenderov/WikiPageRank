import DescriptionCard from "./components/DescriptionCard";
import {useEffect, useRef, useState} from "react";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import {Autocomplete, Grid, Pagination, TextField} from "@mui/material";

const url = 'http://localhost:8000/'

function App() {
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [status, setStatus] = useState(-1);
    const [data, setData] = useState([]);
    const [size, setSize] = useState(4);
    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [timeoutId, setTimeoutId] = useState(0);

    function CategoryListFetch() {
        fetch(url + 'categories/').then(response => response.json()).then(data => {
            setCategories(data.map(p => p.title))
        })
    }
    function CategoryFetch() {
        clearTimeout(timeoutId)
        fetch(url + 'categoryrank/?' + new URLSearchParams({
            category: categoryName,
            page: page - 1,
            size: size
        })).then(response => response.json()).then(o => {
            setData(o.data)
            setTotal(o.total + 1)
            setStatus(o.status)
            if (o.status === 2 || o.status === 1) {
                setTimeoutId(setTimeout(CategoryFetch, 3000))
            }
        })
    }

    const myRef = useRef();

    function OnCategoryChange(e, value) {
        setStatus(-1)
        setPage(1)
        setCategoryName(value)
    }

    function OnPageChange(e, value) {
        setPage(value)
    }

    function ChangeSize() {
        setSize(Math.floor(myRef.current.clientWidth / 350))
    }

    useEffect(() => {
        console.log(page, categoryName)
        if (categories.includes(categoryName)) {
            CategoryFetch(categoryName)
        }
    }, [categories, categoryName, page, size])

    useEffect(() => {
    }, [status])

    useEffect(()=>{
        CategoryListFetch()
    }, [])

    const cards = [];

    for (const page of data) {
        cards.push(
                <Grid item>
                    <DescriptionCard page={page} />
                </Grid>
            );
    }

    return (
        <Container maxWidth={false} align = "center" ref={myRef}>
            <Typography variant="h4" component="h1" gutterBottom my={4}>
                PageRank категорий русской Wiki
            </Typography>
            <Autocomplete my={4}
                align="center"
                disablePortal
                id="combo-box-demo"
                options={categories}
                onChange={OnCategoryChange}
                sx={{ width: 300 }}
                renderInput={
                (params) =>
                    <TextField {...params}
                               my={4}
                               label="Movie"
                    />}
            />
            {status === 0 &&
                <Grid container
                      spacing={2}
                      justifyContent='center'
                      my={4}
                >
                    {cards}
                </Grid>}
            {status === 0 && <Pagination
                count={total}
                page={page}
                onChange={OnPageChange}
                sx={{display:"flex", justifyContent:"center"}}
            />}
            {status === 1 && <Typography my={4}>
                Категория принята на обработку!
            </Typography>}
            {status === 2 && <Typography my={4}>
                Категория обрабатывается.
            </Typography>}
            {status === -1 && <Typography my={4}>
                Выберите категорию.
            </Typography>}
        </Container>
    );
}

export default App;
