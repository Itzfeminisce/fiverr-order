import Image from '../Image'
import FiverrFooter from "../../assets/fiverr_footer.svg"
import ChevronRight from "../../assets/chevron-right.svg"


const Footer = () => {
    return (
        <>
            <div className="bg-gray-50 border-y border-y-gray-200 p-4 space-y-4 my-4">
                <a href="https://fiverr.com" target="_blank" rel="noindex noreferer nofollow" className="flex items-start justify-between font-semibold text-sm text-gray-600">Categories <Image src={ChevronRight} className="w-4" /></a>
                <a href="https://fiverr.com" target="_blank" rel="noindex noreferer nofollow" className="flex items-start justify-between font-semibold text-sm text-gray-600">About <Image src={ChevronRight} className="w-4" /></a>
                <a href="https://fiverr.com" target="_blank" rel="noindex noreferer nofollow" className="flex items-start justify-between font-semibold text-sm text-gray-600">Support and Education <Image src={ChevronRight} className="w-4" /></a>
                <a href="https://fiverr.com" target="_blank" rel="noindex noreferer nofollow" className="flex items-start justify-between font-semibold text-sm text-gray-600">Community <Image src={ChevronRight} className="w-4" /></a>
                <a href="https://fiverr.com" target="_blank" rel="noindex noreferer nofollow" className="flex items-start justify-between font-semibold text-sm text-gray-600">Business Solutions <Image src={ChevronRight} className="w-4" /></a>
            </div>
            <div className="bg-gray-50 border-y border-y-gray-200 my-4 flex-col items-center justify-center text-center py-6">
                <Image src={FiverrFooter} className="w-16 mx-auto" />
                <p className="text-sm text-gray-600">© Fiverr International Ltd. 2024</p>
            </div>
        </>
    )
}

export default Footer