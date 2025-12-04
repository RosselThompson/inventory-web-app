import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

const BackButton = () => {
	const navigate = useNavigate();
	const handleGoBack = () => {
		navigate(-1);
	};
	return (
		<div className='my-4 flex items-center'>
			<Button variant='ghost' size='icon' onClick={handleGoBack}>
				<ArrowLeft />
			</Button>
			<p className='text-sm ml-2'>Back</p>
		</div>
	);
};

export default BackButton;
