import React from "react";
import Cart from "./Cart";
import Navbar from "./Navbar";

import {deleteDoc,
  updateDoc,
  doc,
  docRef,
  getFirestore,
  collection,
  addDoc,
  onSnapshot
} from "firebase/firestore";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      loading: true,
    };
    this.db = getFirestore();
  }
  componentDidMount() {

    onSnapshot(
      collection(this.db, "products"), 
      (snapshot) => {
        console.log(snapshot);
          let data = [];
    const products = snapshot.docs.map((doc) => {
        data.push({ ...doc.data(), id : doc.id});
      });
      this.setState({ products: data, loading: false });
      },
      (error) => {
        console.log(error);
      });
  
  }

  // componentDidMount() {
  //   firebase
  //     .firestore()
  //     .collection("products")
  //     .get()
  //     .then(snapshot => {
  //       const products = snapshot.docs.map(doc => {
  //         const data = doc.data();
  //         data["id"] = doc.id;
  //         return data;
  //       });
  //       this.setState({ products: products, loading: false });
  //     });
  // }
  handleIncreaseQuantity = (product) => {
    // console.log("Heyy please inc the qty of ", product);
    const { products } = this.state;
    const index = products.indexOf(product);

    const docRef = doc(this.db,"products",products[index].id);
    // provides the updated data, 
    updateDoc(docRef, {
      qty: products[index].qty + 1,
    }).then(() => {
      console.log('Document updated Successfully');
    }).catch((err) => {
      console.log("Document failed to update", err);
    })

    
    // products[index].qty += 1;

    // this.setState({
    //   products,
    // });
  };
  handleDecreaseQuantity = (product) => {
    // console.log("Heyy please inc the qty of ", product);
    const { products } = this.state;
    const index = products.indexOf(product);

    if (products[index].qty === 0) {
      return;
    }
    const productDocRef = doc(this.db, "products", products[index].id);
    updateDoc(productDocRef, {
      qty: products[index].qty - 1,
    }).then(() => {
      console.log('Document updated Successfully');
    }).catch((err) => {
      console.log("Document failed to update", err);
    })

    // products[index].qty -= 1;

    // this.setState({
    //   products,
    // });
  };
  handleDeleteProduct = (productId) => {
    
    //Get the Product Document Reference, In doc we pass the db instance of firebase, name of collection, and id of document to be fetched
    const productDocRef = doc(this.db, "products", productId);

    //Calling the deleteDoc function of Firestore, and passing the productDocRef to it, in order to delete that product
    deleteDoc(productDocRef).then(() => {
      console.log("Product deleted successfully");
    }).catch((err) => {
      console.log("Failed to delete products");
    })
    // const items = products.filter((item) => item.id !== id); // [{}]

  //   // this.setState({
  //   //   products: items,
  //   // });
  }
 
  getCartTotal = () => {
    const { products } = this.state;

    let cartTotal = 0;

    products.map((product) => {
      cartTotal = cartTotal + product.qty * product.price;
    });

    return cartTotal;
  };

  getCartCount = () => {
    const { products } = this.state;

    let count = 0;

    products.forEach((product) => {
      count += product.qty;
    });

    return count;
  };

  addProduct = () =>{

    const docRef =  addDoc(collection(this.db, "products"), {
       img:"data:image/jpeg;base64,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",
         price: '800',
         qty: 4,
         title: ''
    })
    .then((docRef) => {
     console.log('product has been added', docRef);
    }).catch((error) => {
         console.log('Error', error);
    })
  }

  render() {
    const { products, loading } = this.state;
    console.log( this.db );
    return (
      <div className="App">
        <Navbar count={this.getCartCount()} />
        <button onClick={this.addProduct} style={{padding:20, fortSize:20 , marginTop:10,
        marginLeft :10 ,color: 'white', background:'#f329ac'}}>Add Products</button>
        <Cart
          products={products}
          onIncreaseQuantity={this.handleIncreaseQuantity}
          onDecreaseQuantity={this.handleDecreaseQuantity}
          onDeleteProduct={this.handleDeleteProduct}
        />
         {loading && <h1>Loading Products...</h1>}
        <div style={{ padding: 10, fontSize: 30 }}>
          TOTAL : {this.getCartTotal()}
        </div>
      </div>
    );
  }
}

export default App;
