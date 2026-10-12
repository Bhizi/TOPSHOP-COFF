import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaClipboardList } from 'react-icons/fa'
import {
    collection,
    query,
    where,
    getDocs,
    deleteDoc,
    doc,
    orderBy,
} from 'firebase/firestore'
import { db } from '../lib/firebase'
import { useAuth } from '../context/AuthContext'
import { OrderCard } from '../components/OrderCard'
import { useToast } from '../context/ToastContext'
import { useConfirm } from '../context/ConfirmContext'

export const Orders = () => {
    const { currentUser } = useAuth()
    const [orders, setOrders] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const { showToast } = useToast()
    const { confirm } = useConfirm()

    const fetchOrders = async () => {
        if (!currentUser) return
        setIsLoading(true)
        try {
            const q = query(
                collection(db, 'orders'),
                where('userId', '==', currentUser.uid)
            )
            const snapshot = await getDocs(q)
            const list = snapshot.docs.map((d) => ({
                id: d.id,
                ...d.data(),
            }))
            list.sort((a, b) => new Date(b.date) - new Date(a.date))
            setOrders(list)
            setError(null)
        } catch (err) {
            console.error(err)
            setError(err.message)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchOrders()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser])

    const handleDelete = async (orderId) => {
        const confirmed = await confirm({
            title: 'Delete order?',
            message: 'This order will be permanently removed from your history.',
            confirmText: 'Delete',
            cancelText: 'Keep',
        })

        if (!confirmed) return

        try {
            await deleteDoc(doc(db, 'orders', orderId))
            setOrders((prev) => prev.filter((o) => o.id !== orderId))
            showToast('Order deleted')
        } catch (err) {
            console.error(err)
            showToast('Could not delete order')
        }
    }

    const handleClearAll = async () => {
        if (orders.length === 0) return

        const confirmed = await confirm({
            title: 'Clear all orders?',
            message: `This will permanently delete all ${orders.length} orders. This action cannot be undone.`,
            confirmText: 'Clear All',
            cancelText: 'Cancel',
        })

        if (!confirmed) return

        try {
            await Promise.all(
                orders.map((o) => deleteDoc(doc(db, 'orders', o.id)))
            )
            setOrders([])
            showToast('All orders cleared')
        } catch (err) {
            console.error(err)
            showToast('Could not clear orders')
        }
    }

    if (isLoading) {
        return (
            <div className="container orders-container">
                <p className="status-msg">Loading orders...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="container orders-container">
                <p className="status-msg error">Error: {error}</p>
            </div>
        )
    }

    if (orders.length === 0) {
        return (
            <div className="container orders-container">
                <h2 className="section-title center">
                    Order <span>History</span>
                </h2>

                <div className="empty-cart">
                    <div className="icon">
                        <FaClipboardList />
                    </div>
                    <h3>No orders yet</h3>
                    <p>Start shopping and your orders will appear here!</p>
                    <Link to="/menu" className="btn-shop">
                        Browse Drinks
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="container orders-container">
            <h2 className="section-title center">
                Order <span>History</span>
            </h2>

            <div className="orders-actions">
                <button
                    type="button"
                    className="clear-orders-btn"
                    onClick={handleClearAll}
                >
                    Clear All Orders
                </button>
            </div>

            <div className="orders-list">
                {orders.map((order, index) => (
                    <OrderCard
                        key={order.id}
                        order={order}
                        orderNumber={orders.length - index}
                        onDelete={() => handleDelete(order.id)}
                    />
                ))}
            </div>
        </div>
    )
}