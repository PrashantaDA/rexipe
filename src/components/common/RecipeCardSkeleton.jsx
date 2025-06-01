import PropTypes from "prop-types";
import Skeleton from "./Skeleton";

const RecipeCardSkeleton = ({ viewMode = "grid" }) => {
	return (
		<div className={`group relative ${viewMode === "list" ? "w-full" : ""}`}>
			<div className={`overflow-hidden ${viewMode === "list" ? "aspect-[16/9] w-full sm:w-48 md:w-64 flex-shrink-0" : "aspect-[4/3] rounded-t-lg"}`}>
				<Skeleton className="h-full w-full" />
			</div>
			<div className={`${viewMode === "list" ? "flex-1 p-4" : "p-4"} bg-black/80`}>
				<Skeleton
					variant="title"
					className="mb-2"
				/>
				<div className="flex flex-wrap gap-2">
					<Skeleton
						variant="text"
						className="w-20"
					/>
					<Skeleton
						variant="text"
						className="w-16"
					/>
					<Skeleton
						variant="text"
						className="w-24"
					/>
				</div>
			</div>
		</div>
	);
};

RecipeCardSkeleton.propTypes = {
	viewMode: PropTypes.oneOf(["grid", "list"]),
};

export default RecipeCardSkeleton;
