export default function Header() {
    return (
        <div className="flex border-b-1 text-center gap-2 justify-between p-3 bg-[#5a88af]">
            Admin Dashboard
            <nav className="flex gap-3">
                <a href="">Submit Game</a>
                <a href="">Show Listing</a>
                <a href="">Logout</a>
            </nav>
        </div>
    )
}