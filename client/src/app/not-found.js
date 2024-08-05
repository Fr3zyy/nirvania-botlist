import Square from "@/components/Background/Square";
import ErrorPage from "@/components/Error";

export const metadata = {
    title: '404 - Page Not Found | Nirvania',
    description: 'The page you are looking for does not exist. Continue browsing the Nirvania web application.',
};

export default function NotFoundPage() {
    return (
        <div>
            <Square column="6" row="6" zIndex={0} transparentEffectDirection="leftRightBottomTop" blockColor="#808080" />

            <ErrorPage statusCode={404} />
        </div>

    );
}