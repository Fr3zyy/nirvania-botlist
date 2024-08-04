import { AuthProvider } from '@/hooks/auth'

const AuthProvider = ({ context }) => {
    return (
        <AuthProvider>
            {context}
        </AuthProvider>
    )
}

export default AuthProvider