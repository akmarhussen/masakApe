-- exact ingredient
SELECT r.*, c.cuisine, o.occasion
FROM   recipes r
INNER JOIN (
	SELECT   ri.recipe_id
    FROM     recipe_ingredient ri
    WHERE    ri.recipe_id IN (
    	SELECT   ri2.recipe_id
        FROM     recipe_ingredient ri2
        INNER JOIN recipes r2
        ON r2.id = ri2.recipe_id
        GROUP BY ri2.recipe_id
        HAVING   Count(ri2.recipe_id) <= 3
    )
    AND ri.ingredient_id IN (
    	SELECT id
        FROM   ingredients i
        WHERE  i.ingredient IN ("Lime leaves","Coconut milk","Red chilli")
    )
    GROUP BY ri.recipe_id
    HAVING   Count(ri.recipe_id) <= 3
) aa
ON r.id = aa.recipe_id
INNER JOIN cuisines c
ON r.cuisine_id = c.id
INNER JOIN recipe_occasion ro
ON r.id = ro.recipe_id
INNER JOIN occasions o
ON o.id = ro.occasion_id
WHERE c.cuisine IN ("Arabic", "Western")
AND o.occasion = "Breakfast"

SELECT r.*
FROM   recipes r
INNER JOIN (SELECT   ri.recipe_id
            FROM     recipe_ingredient ri
            INNER JOIN recipes r
            ON r.id = ri.recipe_id
            INNER JOIN ingredients i
            ON i.id = ri.ingredient_id
            WHERE    i.ingredient IN ("Lime leaves","Coconut milk","Red chilli")
            GROUP BY ri.recipe_id
            HAVING   Count(ri.recipe_id) = 3) aa
ON r.id = aa.recipe_id