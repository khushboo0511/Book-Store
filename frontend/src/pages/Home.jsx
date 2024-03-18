import axios from 'axios'
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Importing Link from react-router-dom
import {BsInfoCircle } from 'react-icons/bs'; // Importing MdOutlineAddBox and BsInfoCircle from react-icons
import {MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md'
import Spinner from '../components/Spinner'; // Importing Spinner component assuming it's defined in a separate file
import {AiOutlineEdit } from 'react-icons/ai'



const Home = () => {

    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        axios
            .get('http://localhost:4000/books')
            .then((res) => {
                setBooks(res.data.data)
                setLoading(false)
            })
            .catch((error) => {
                console.log(error)
                setLoading(false)
            })
    }, [])

  return (
    <div className='p-4'>
        <div className='flex justify-between items-center'> 
        <h1 className='text-xl my-8'>Books List</h1>
        <Link to='books/create'>
            <MdOutlineAddBox className='text-sky-800 text-4xl' />
        </Link>
        </div>
        {loading ? (
            <Spinner />

        ) : (
            <table className='w-full border-separate border-spacing-2' >
                <thead>
                    <tr>
                    <th className='border border-slate-600 rounded-md'>No</th>
                    <th className='border border-slate-600 rounded-md'>Title</th>
                    <th className='border border-slate-600 rounded-md max-md:hidden'>Author</th>
                    <th className='border border-slate-600 rounded-md max-md:hidden'>Publish Year</th>
                    <th className='border border-slate-600 rounded-md'>Operations</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book, index) => (
                        <tr key={book._id} className='h-8'>
                        <td className='border border-slate-700 rounded text-center'>
                            {index + 1}
                        </td>
                        <td className='border border-slate-700 rounded text-center'>
                            {book.title}
                        </td>
                        <td className='border border-slate-700 rounded text-center max-md:hidden'>
                            {book.author}
                        </td>
                        <td className='border border-slate-700 rounded text-center max-md:hidden'>
                            {book.publishYear}
                        </td>
                        <td className='border border-slate-700 rounded text-center'>
                            <div className='flex justify-center gap-x-4'>
                                <Link to={`/books/details/${book._id}`}>
                                    <BsInfoCircle className='text-2xl text-green-600' />
                                </Link>
                                <Link to={`/books/edit/${book._id}`}>
                                    <AiOutlineEdit className='text-2xl text-yellow-600' />
                                </Link>
                                <Link to={`/books/delete/${book._id}`}>
                                    <MdOutlineDelete className='text-2xl text-red-600' />
                                </Link>
                            </div>
                        </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}

    </div>
  )
}

export default Home