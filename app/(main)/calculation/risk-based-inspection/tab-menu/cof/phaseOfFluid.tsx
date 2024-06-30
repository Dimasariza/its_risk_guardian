import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { InputSwitch } from "primereact/inputswitch";
import { useState } from "react";

function PhaseOfFluid({visible, setVisible}: any) {
    // const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const products = [
        {
            id: '1000',
            code: 'f230fh0g3',
            name: 'Bamboo Watch',
            description: 'Product Description',
            image: 'bamboo-watch.jpg',
            price: 65,
            category: 'Accessories',
            quantity: 24,
            inventoryStatus: 'INSTOCK',
            rating: 5
        },
        {
            id: '10001',
            code: 'f230fh0g3',
            name: 'Bamboo Watch 2',
            description: 'Product Description',
            image: 'bamboo-watch.jpg',
            price: 65,
            category: 'Accessories',
            quantity: 24,
            inventoryStatus: 'INSTOCK',
            rating: 5
        },
    ]
    return (
        <Dialog header="Phase of Fluid" 
            visible={visible} 
            style={{ width: '50vw' }} 
            onHide={() => {if (!visible) return; setVisible((prev: any) => ({...prev, phase: false})); }}
        >

            <DataTable value={products} selectionMode={"single"} selection={selectedProduct} onSelectionChange={(e: any) => setSelectedProduct(e.value)} dataKey="id" tableStyle={{ minWidth: '50rem' }}>
                <Column selectionMode="single" headerStyle={{ width: '3rem' }}></Column>
                <Column field="code" header="Code"></Column>
                <Column field="name" header="Name"></Column>
                <Column field="category" header="Category"></Column>
                <Column field="quantity" header="Quantity"></Column>
            </DataTable>
        </Dialog>
    )
}

export default PhaseOfFluid;