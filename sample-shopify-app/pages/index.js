import React, { useState } from 'react';
import { EmptyState, Layout, Page } from '@shopify/polaris';
import { ResourcePicker } from '@shopify/app-bridge-react';
import store from 'store-js';
import ProductList from '../components/ProductList';
import axios from 'axios';

function Index() {

    const [modal, setModal] = useState({ open: false })
    const emptyState = !store.get('ids');

    function handleSelection(resources) {
        console.log(resources);
        const idsFromResources = resources.selection.map((product) => product.id);
        
        setModal({ open: false });
        store.set('ids', idsFromResources)

        const selectedProducts = resources.selection;

        deleteApiData();

        selectedProducts.map(product => makeApiCall(product));
    }

    function deleteApiData() {
        const url = '/api/products';

        axios.delete(url);
    }

    async function makeApiCall(products) {
        const url = '/api/products';
        console.log(products);
        axios.post(url, products)
            .then(result => console.log(result))
            .catch(error => console.log(error))
    }


    return (

        <Page>
            
                <ProductList />
            
        </Page>
    
    )

}

export default Index;
