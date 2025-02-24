import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";

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

const fetchPost = async(id: string)=>{
    if(!id){
        throw new Error('ID is required');
    }
    const response = await axios.get(`https://fakestoreapi.com/products/${id}`).catch(()=>{throw new Error("failed")});

    return response.data;
    
}

const ProductDetails = () => {
    const {id} = useParams<{id : string}>();

    const {data, isLoading, error} = useQuery<IProductData>({
        queryKey : ["",id],
        queryFn : ()=> fetchPost(id!),
        retry: false,
        refetchOnWindowFocus : false,
    });

    if(isLoading){
        return <h1>Loading ...</h1>
    }
    if(error){
        return <h1>{error.message}</h1>
    }

  return (
    <>
        <div style={{padding : 20}}>
            <h2>Product Details : </h2>
            <div>{JSON.stringify(data)}</div>
        </div>
    </>
  );
};

export default ProductDetails;
