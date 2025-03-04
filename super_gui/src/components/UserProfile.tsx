import userIcon from '/assets/icons/user.svg'

const UserProfile = () => {
    return (
        <div className='flex flex-col p-3'>
            <img 
                src={userIcon} alt="User Icon"
                className='h-24'/>
            <h3 className='font-semibold text-xl'>User Name</h3>
            <p className='italic'>Apartment 201</p>
        </div>
    )
}

export default UserProfile