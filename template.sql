-- 714a0302-8b17-44cf-a5a2-cd2496c42e42 ==< groupId
-- d5420f70-f79c-4068-8681-2851c85044b8 ==< userId

SELECT users.user_id, users.email, users.phone, 
users.username,
users.server_res_object,
user_groups.group_id FROM chati.user_groups JOIN 
chati.users ON users.user_id = user_groups.user_id 
WHERE group_id="714a0302-8b17-44cf-a5a2-cd2496c42e42"

-- //
SELECT * FROM messages WHERE 
(receiver_user=1 AND sending_user=2) OR
(receiver_user=2 AND sending_user=1)
