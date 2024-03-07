import React from 'react';
import './ProductsTable.css';

function ProductsTable({data, filter}) {
    return (
        <div className="w-full flex items-center justify-center">
            {data && data.length ? (
                <table className="products-table">
                    <thead>
                    <tr>
                        <th className="id-column">ID</th>
                        <th>
                            <input className="text-center bg-inherit text-white placeholder-white border-0 outline-0"
                                   placeholder="Name"
                                   onBlur={(e) => filter('name', e.target.value)}/>
                        </th>
                        <th>
                            <input
                                className="text-center bg-inherit text-white placeholder-white border-0 outline-0 max-w-[100px]"
                                placeholder="Price" onBlur={(e) => filter('price', e.target.value)}/>
                        </th>
                        <th>
                            <input className="text-center bg-inherit text-white placeholder-white border-0 outline-0"
                                   placeholder="Brand" onBlur={(e) => filter('brand', e.target.value)}/>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map(({id, product, price, brand}) => (
                        <tr key={id}>
                            <td className="id-column w-max">{id}</td>
                            <td className="w-max">{product}</td>
                            <td className="text-center w-max">{price}</td>
                            <td className="text-center w-max">{brand}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p className="no-data-message">No products available.</p>
            )}
        </div>
    );
}

export default ProductsTable;
