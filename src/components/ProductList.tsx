import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

interface IProductData {
  title: string;
  id:number;
  description : string;
  image: string;
  category : string;
  price : number;
  rating : {
      rate : string;
  };
}

const fetchProducts = async()=>{
  const response = await axios.get("https://fakestoreapi.com/products").catch(()=>{throw new Error("Failed")});
  
  return response.data;
}

const ProductList = () => {
  const {data, isLoading, error} = useQuery<IProductData[]>({
    queryKey : ["products"],
    queryFn : fetchProducts,
    retry : false,
    refetchOnWindowFocus : false
  });

  if(isLoading){
    return <h1>Loading .....</h1>
  }
  if(error){
    return <h1>{error.message}</h1>
  }  
  
  return (
    <>
      <h2>Product List</h2>
      <ul>
        {data?.map((product)=>
          <li key={product.id}>
            <Link to = {`/products/${product.id}`}>{product.title}</Link>
          </li>
      )}
      </ul>
    </>
  );
};

export default ProductList;
