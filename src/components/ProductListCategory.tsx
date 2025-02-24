import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
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

const fetchProductsByCategory = async(category:string)=>{
    const response = await axios.get(`https://fakestoreapi.com/products/category/${category}`).catch(()=>{throw new Error("Failed")});
    
    return response.data;
  }

  const fetchCategories = async()=>{
    const response = await axios.get('https://fakestoreapi.com/products/categories').catch(()=>{throw new Error("Failed")});

    return response.data;
  }

const ProductListCategory = () => {
    const [category ,setCategory] = useState<string>("");
    
    const {data:categoryData} = useQuery<string[]>({
    queryKey : [""],
    queryFn : fetchCategories,
    retry : false,
    refetchOnWindowFocus : false
  });

  useEffect(()=>{setCategory("electronics")},[])

  const {data:productDataByCategory, isLoading, error} = useQuery<IProductData[]>({
    queryKey : ["",category],
    queryFn : ()=> fetchProductsByCategory(category),
    enabled: !!category,
    retry : false,
    refetchOnWindowFocus:false
  });

  if(isLoading){
    return <h1>Loading...</h1>
  }

  if(error){
    return <h1>{error.message}</h1>
  }
  
  return (<>
    <select value={category} onChange={(e)=>setCategory(e.target.value)}>
        {categoryData?.map((category:string,index: number)=>(
            <option key = {index} value = {category}>{category}</option>
        ))}
    </select> 
    <br />
    <ul>
        {productDataByCategory?.map((product)=>
          <li key={product.id}>
            <Link to = {`/products/${product.id}`}>{product.title}</Link>
          </li>
      )}
      </ul>
  </>);
};

export default ProductListCategory;
