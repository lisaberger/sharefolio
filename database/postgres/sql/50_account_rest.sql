/*************************************************************************************
 * Account: REST Functions
 *************************************************************************************/

BEGIN;

/* Cleanup */

DROP FUNCTION IF EXISTS post_account  (          _data JSONB);
DROP FUNCTION IF EXISTS put_account   (_id UUID, _data JSONB);
DROP FUNCTION IF EXISTS patch_account (_id UUID, _data JSONB);
DROP FUNCTION IF EXISTS delete_account(_id UUID);

/* Functions */

CREATE FUNCTION post_account(_data JSONB) RETURNS TABLE ("result" JSONB) 
LANGUAGE plpgsql
AS 
$$
BEGIN 
  RETURN QUERY
  SELECT rest_helper -- $1 = _id, $2 = _data
         ('INSERT INTO "account"("name", "user", "email", "password", "is_admin")
           VALUES(json_attr_value_d_untainted($2, ''lastname'',  NULL),
                  json_attr_value_d_untainted($2, ''user'',  NULL),
                  json_attr_value_d_untainted($2, ''email'', NULL),
                  ($2->>''password'')::TEXT, 
                  COALESCE(($2->>''isAdmin'' )::BOOLEAN, false)
                 )
          ', 
          _data => _data, _http_status => 201
         );
END
$$
;

CREATE FUNCTION put_account(_id UUID, _data JSONB) RETURNS TABLE ("result" JSONB) 
LANGUAGE plpgsql
AS 
$$
BEGIN 
  RETURN QUERY
  SELECT rest_helper -- $1 = _id, $2 = _data
         ('UPDATE "account" a
           SET    "lastname"     = json_attr_value_d_untainted($2, ''lastname'',  NULL),
                  "user"     = json_attr_value_d_untainted($2, ''user'',  NULL),
                  "email"    = json_attr_value_d_untainted($2, ''email'', NULL),
                  "password" = COALESCE(($2->>''password'')::TEXT, a."password"),
                  "is_admin"  = COALESCE(($2->>''is_admin'')::BOOLEAN, false)
           WHERE  a."id" = $1
          ', 
          _id => _id, _data => _data, _constraint => 'account_exists'
         );
END
$$
;

CREATE FUNCTION patch_account(_id UUID, _data JSONB) RETURNS TABLE ("result" JSONB) 
LANGUAGE plpgsql
AS 
$$
BEGIN 
  RETURN QUERY
  SELECT rest_helper -- $1 = _id, $2 = _data
         ('UPDATE "account" a
           SET    "lastname"     = json_attr_value_d_untainted($2, ''lastname'',     a."lastname"),
                  "user"     = json_attr_value_d_untainted($2, ''user'',     a."user"),
                  "email"    = json_attr_value_d_untainted($2, ''email'',    a."email"),
                  "password" = json_attr_value_not_null   ($2, ''password'', a."password")::TEXT,
                  "is_admin"  = json_attr_value_not_null   ($2, ''is_admin'',  a."is_admin"::TEXT)::TEXT::BOOLEAN
           WHERE  a."id" = $1
          ', 
          _id => _id, _data => _data, _constraint => 'account_exists'
         );
END
$$
;

CREATE FUNCTION delete_account(_id UUID) RETURNS TABLE ("result" JSONB) 
LANGUAGE plpgsql
AS 
$$
BEGIN 
  RETURN QUERY
  SELECT rest_helper -- $1 = _id, $2 = _data
         ('DELETE 
           FROM   "account" a
           WHERE  a."id" = $1
          ', 
          _id => _id, _constraint => 'account_exists'
         );
END
$$
;

/* Save it */

COMMIT;