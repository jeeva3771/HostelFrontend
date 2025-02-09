import { useEffect, useState } from "react"
import { wardenAppUrl } from "../../../config"

const BlockList = () => {
    const [blocks, setBlocks] = useState([]);
    const [pageNo, setPageNo] = useState(1);
    const [limit, setLimit] = useState(10);
    const [searchText, setSearchText] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        document.title = "Block List"
    }, [])

    useEffect(() => {
        fetchBlocks();
    }, [pageNo, limit, searchText]);

    const fetchBlocks = async () => {
        setLoading(true);
        try {
            let url = `${wardenAppUrl}/api/block/?limit=${limit}&page=${pageNo}&orderby=bk.createdAt&sort=DESC`;
            if (searchText) {
                url += `&search=${searchText.trim()}`;
            }

            const response = await fetch(url, {method: 'GET',credentials: 'include'});
            const data = await response.json();
            console.log(data)
            setBlocks(data.blocks || []);
        } catch (error) {
            console.error("Error fetching block data:", error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Block List</h2>
            <input
                type="text"
                placeholder="Search"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="form-control mb-2"
            />
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Block Code</th>
                        <th>Location</th>
                        <th>Status</th>
                        <th>Created By</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr><td colSpan="6" className="text-center">Loading...</td></tr>
                    ) : blocks.length > 0 ? (
                        blocks.map((block, index) => (
                            <tr key={block.blockCode}>
                                <td>{(pageNo - 1) * limit + index + 1}</td>
                                <td>{block.blockCode}</td>
                                <td>{block.blockLocation}</td>
                                <td>{block.isActive === 1 ? 'Active' : ''}</td>
                                <td>{block.createdFirstName} {block.createdLastName}</td>
                                <td>
                                    <button className="btn btn-info btn-sm">View</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr><td colSpan="6" className="text-center text-danger">No data found</td></tr>
                    )}
                </tbody>
            </table>
            <div className="d-flex justify-content-between">
                <button className="btn btn-primary" disabled={pageNo === 1} onClick={() => setPageNo(pageNo - 1)}>Previous</button>
                <button className="btn btn-primary" onClick={() => setPageNo(pageNo + 1)}>Next</button>
            </div>
        </div>
    );
};

export default BlockList;
