import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SideBar4 from "src/components/Admin/SideBar4";
import Footer from "src/components/Footer";
import NavBarAdmin from "src/components/NavBarAdmin";
import TitleBanner from "src/components/TitleBanner";
import { fetchAdminFinanceList } from "src/store/admin/finance";

export default function Finance() {
    const [finances, setFinances] = useState([])
    const dispatch = useDispatch()
    const adminFinanceStore = useSelector(state => state.adminFinance)


    useEffect(() => {
        dispatch(fetchAdminFinanceList({}))
    }, [dispatch])



    useEffect(() => {
        setFinances(adminFinanceStore.data)
    }, [adminFinanceStore])


    function formatTimestamp(timestamp) {
        const options = {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        };

        return new Date(timestamp).toLocaleDateString('en-US', options);
    }


    function formatTotalCost(totalCost) {
        const formattedCost = totalCost.toLocaleString('en-US', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

        return formattedCost;
    }
    return (
        <>
            <NavBarAdmin />
            <>
                <div className="row container">
                    <div className="col-2">
                        <SideBar4 />
                    </div>
                    <div className="col-10">
                        <TitleBanner marginBotton={'40px'} padding={'7'} title={'Transactions'} />
                        <table className="table table-bordered table-hover transaction">
                            <thead className="thead-dark">
                                <tr style={{ backgroundColor: "#38325059" }}>
                                    <th scope="col">Transaction Id</th>
                                    <th scope="col">Booking Id</th>
                                    <th scope="col">Customer Name</th>
                                    <th scope="col">Arrival Date</th>
                                    <th scope="col">Departure Date</th>
                                    <th scope="col">Final Cost</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    finances.map((finance, i) => {
                                        return (
                                            <>
                                                <tr>

                                                    {/* <th scope="row"></th> */}
                                                    <td>{finance.id}</td>
                                                    <td>{finance.bookingId}</td>
                                                    <td>{finance.username}</td>
                                                    <td>{formatTimestamp(finance.arrivalDate)}</td>
                                                    <td>{formatTimestamp(finance.deptDate)}</td>
                                                    <td>{formatTotalCost(parseFloat(finance.finalCost))}</td>
                                                </tr>
                                            </>
                                        )
                                    })
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </>
            <Footer />
        </>
    )
}
Finance.guestGuard = false
Finance.authGuard = true
Finance.adminGuard = true