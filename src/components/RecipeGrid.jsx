/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Card from "./Card";
import { containerVariants, itemVariants } from "../utils/animations";
import { commonStyles } from "../utils/styles";

const RecipeGrid = ({ title, items }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="py-20"
        >
            <div className={commonStyles.container}>
                {title && (
                    <div className="mb-16 text-center">
                        <h2 className={commonStyles.heading2}>{title}</h2>
                        <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-accent" />
                    </div>
                )}
                
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className={commonStyles.grid.responsive}
                >
                    {items.map((item) => (
                        <motion.div key={item.id} variants={itemVariants}>
                            <Link to={`/recipe/${item.id}`}>
                                <Card
                                    image={item.image || item.img}
                                    title={item.title}
                                    id={item.id}
                                    readyInMinutes={item.readyInMinutes}
                                    servings={item.servings}
                                    healthScore={item.healthScore}
                                />
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </motion.div>
    );
};

export default RecipeGrid;
