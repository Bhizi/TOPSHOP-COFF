import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaClipboardList } from 'react-icons/fa'
import { OrderCard } from '../components/OrderCard'
import { useToast } from '../context/ToastContext'
import { useConfirm } from '../context/ConfirmContext'

export const Orders = () => {
    const [orders, setOrders] = useState([])
    const { showToast } = useToast()
    const { confirm } = useConfirm()

    useEffect(() => {
        const history = JSON.parse(localStorage.getItem('orderHistory')) || []
        setOrders(history)
    }, [])

    const persist = (next) => {
        setOrders(next)
        localStorage.setItem('orderHistory', JSON.stringify(next))
    }

    const handleDelete = async (index) => {
        const confirmed = await confirm({
            title: 'Delete order?',
            message: 'This order will be permanently removed from your history.',
            confirmText: 'Delete',
            cancelText: 'Keep',
        })

        if (!confirmed) return

        const next = orders.filter((_, i) => i !== index)
        persist(next)
        showToast('Order deleted')
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

        persist([])
        showToast('All orders cleared')
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
                {[...orders].reverse().map((order, reverseIndex) => {
                    const originalIndex = orders.length - 1 - reverseIndex
                    return (
                        <OrderCard
                            key={originalIndex}
                            order={order}
                            orderNumber={originalIndex + 1}
                            onDelete={() => handleDelete(originalIndex)}
                        />
                    )
                })}
            </div>
        </div>
    )
}