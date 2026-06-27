import Link from 'next/link';
import React from 'react';

const Books = () => {
    return (
        <div>
            <div className='flex justify-between'>
                <h1 className='font-bold text-2xl'>Total Books: </h1>
                <div>
                    <Link className='px-3 py-2 rounded text-white bg-bgprimary' href="/admin/books/addbook">Add Book</Link>
                </div>
            </div>
        </div>
    );
};

export default Books;