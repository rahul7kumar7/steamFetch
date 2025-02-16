export default function Signin() {
    return (
        <>
            <div className="container max-w-lg mx-auto">
                <form action="" className="border-1 p-4 text-center">
                    <h2>SignIn</h2>
                    <br/>
                    <div className="flex flex-col gap-2 text-left">
                        <div className="flex gap-2 p-2 items-center">
                            <label htmlFor="email" className="p-1 w-[100px]">Email:</label>
                            <input type="email" placeholder="email"  className="border-1 p-1"/>
                        </div>
                        <div className="flex gap-2 p-2 items-center">
                            <label htmlFor="password" className="p-1 w-[100px]">Password:</label>
                            <input type="password" placeholder="password"  className="border-1 p-1"/>
                        </div>
                        <div className="flex gap-2 p-2 items-center">
                            <button className="rounded-sm p-2 bg-amber-500 cursor-pointer hover:opacity-90">Signin</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}