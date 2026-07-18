"use client"

import { createAdmin } from '@/actions/createAdmin';
import React from 'react';

const page = () => {
    return (
        <div>
            <button onClick={()=>createAdmin()}>Create Admin</button>
        </div>
    );
};

export default page;