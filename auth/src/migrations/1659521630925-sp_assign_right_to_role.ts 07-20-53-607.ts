import { MigrationInterface, QueryRunner } from 'typeorm';

export class spAssignRightToRole1659521630925 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE OR REPLACE FUNCTION sp_assign_right_to_role(right_name character varying, role_name character varying)
        RETURNS void
        LANGUAGE plpgsql
       AS $function$
                           DECLARE  
                               _role_id int;
                               _right_id int;
                               _role_right_id int;
                               _role_count int;
                               _right_count int;
                               _role_right_count int;    	     
                           BEGIN
                               SELECT INTO _role_count COUNT(*) FROM "role" WHERE "name"=role_name;
                               SELECT INTO _right_count COUNT(*) FROM "right" WHERE "name"=right_name;
                               RAISE NOTICE 'right_count: %', _right_count;
                               RAISE NOTICE 'role_count: %', _role_count;
                              
                               IF _role_count = 0 THEN	
                                   RAISE EXCEPTION 'role_name: % not found', role_name;
                                   RETURN;	
                               ELSIF _right_count = 0 THEN	
                                   RAISE EXCEPTION 'right_name: % not found', right_name;
                                   RETURN;    	              
                               ELSIF _role_count = 1 AND _right_count = 1 THEN	
                                   SELECT INTO _role_id "id" FROM "role" WHERE "name"=role_name;	
                                   RAISE NOTICE 'role_id: % ', _role_id;		
                                   SELECT INTO _right_id "id" FROM "right" WHERE "name"=right_name;
                                   RAISE NOTICE 'right_id: % ',_right_id;
                               ELSE	
                                   RAISE EXCEPTION 'undefined situation!';
                                   RETURN;
                               END IF;	
                               SELECT INTO _role_right_count COUNT(*) FROM role_right where role_right."role_id"=_role_id AND role_right."right_id"=_right_id;
                                                                               
                               RAISE NOTICE 'role_right_count: % ',_role_right_count;    	                	
                               IF _role_right_count > 0 THEN			                
                                   RETURN;	
                               ELSE	
                                   INSERT INTO role_right (role_id, right_id) VALUES(_role_id, _right_id);
                                   RAISE NOTICE 'Role Right assignment successful ; role_name: % , role_id: % - right_name: % , right_id: % ',role_name, _role_id, right_name, _right_id;
                               END IF;
                           END;
                           $function$
       ;
       
       
       
        CREATE OR REPLACE FUNCTION sp_revoke_right_from_role(right_name character varying, role_name character varying)
        RETURNS void
        LANGUAGE plpgsql
        AS $function$
                        DECLARE
                            _role_id int;
                            _right_id int;
                            _role_right_id int;
                            _role_count int;
                            _right_count int;
                            _role_right_count int;    	                
                        BEGIN
                            SELECT INTO _role_count COUNT(*) FROM "role" WHERE "name"=role_name;
                            SELECT INTO _right_count COUNT(*) FROM "right" WHERE "name"=right_name;
                            RAISE NOTICE 'right_count: %',_right_count;
                            RAISE NOTICE 'role_count: %',_role_count;
                                    
                            IF _role_count = 0 THEN	
                                RAISE NOTICE 'role_name: % not found!',_role_name;
                                return;	
                            ELSIF _right_count = 0 THEN	
                                RAISE NOTICE 'right_name: % not found!',_right_name;
                                return;    	              
                            ELSIF _role_count > 1 THEN	
                                RAISE NOTICE 'role_name: %, role_count: % birden fazla role!',role_name, _role_count;
                                return;	
                            ELSIF _right_count > 1 THEN	
                                RAISE NOTICE 'right_name:%, right_count:% birden fazla right!',right_name, _right_count;
                                return;	
                            ELSIF _role_count = 1 AND _right_count = 1 THEN	
                                SELECT INTO _role_id "id" FROM "role" WHERE "name"=role_name;	
                                RAISE NOTICE 'role_id: % ',_role_id;
                                SELECT INTO _right_id "id" FROM "right" WHERE "name"=right_name;
                                RAISE NOTICE 'right_id: % ' ,_right_id;			
                            ELSE	
                                RAISE EXCEPTION 'undefined situation!';
                                return;
                            END IF;	
                            SELECT INTO _role_right_count COUNT(*) FROM role_right rr WHERE "role_id"=_role_id AND "right_id"=_right_id;	
                            RAISE NOTICE 'role_right_count: %',_role_right_count;
                                
                            IF _role_right_count = 0 THEN	
                                RAISE NOTICE 'Zaten bölye bir atama yok!; role_name: % , role_id: % - right_name: % , right_id: %',role_name,role_id,right_name,right_id;
                                return;	
                            ELSE
                                DELETE FROM role_right rr WHERE role_id = _role_id AND right_id = _right_id;		               
                                RAISE NOTICE 'Right revoke successful ; role_name: % , role_id: % - right_name: %, right_id: %',role_name,_role_id,right_name,_right_id;
                            END IF;
                        END;
                        $function$
        ;

        CREATE OR REPLACE FUNCTION sp_assign_role_to_user(role_name character varying, _user_name character varying)
        RETURNS void
        LANGUAGE plpgsql
        AS $function$
                        DECLARE  
                            _role_id int;
                            _user_id int;
                            _user_role_id int;
                            _role_count int;
                            _user_count int;
                            _user_role_count int;
                        BEGIN
                            SELECT INTO _role_count COUNT(*) FROM "role" WHERE "name"=role_name;
                            SELECT INTO _user_count COUNT(*) FROM "user" WHERE "user_name"=_user_name;	
                            RAISE NOTICE 'role_count %',_role_count;
                            RAISE NOTICE 'user_count %',_user_count;	
                                
                            IF _role_count = 0 THEN	
                                RAISE EXCEPTION 'role_name: % not found!', role_name;
                                RETURN;
                            ELSIF _user_count = 0 THEN	
                                RAISE EXCEPTION 'user_name: % not found!', _user_name;
                                RETURN;	    	                
                            ELSIF _role_count > 1 THEN
                                RAISE EXCEPTION 'role_name: %, count: % birden fazla role!',role_name, _role_count;
                                RETURN;
                            ELSIF _user_count > 1 THEN	
                                RAISE EXCEPTION 'user_name: % , count: % more than one username!',_user_name, _user_count;
                                RETURN;
                            ELSIF _role_count = 1 AND _user_count = 1 THEN	
                                SELECT INTO _role_id "id" FROM "role" r WHERE r."name" =role_name;	
                                RAISE NOTICE 'role_id: %', _role_id;
                                SELECT INTO _user_id "id" FROM "user" u WHERE u.user_name =_user_name;
                                RAISE NOTICE 'user_id: %', _user_id;
                            ELSE
                                RAISE EXCEPTION 'undefined situation!';
                                RETURN;
                            END IF;	
                            SELECT INTO _user_role_count COUNT(*) FROM user_role ur WHERE ur.role_id=_role_id AND ur.user_id =_user_id;	
                            RAISE NOTICE 'user_role_count: %', _user_role_count;		
                            IF _user_role_count > 0 THEN    		                
                                RETURN;
                            ELSE
                                INSERT INTO user_role (role_id , user_id) VALUES(_role_id, _user_id);
                                RAISE NOTICE 'User Role assignment successful ; role_name: %, role_id: % - user_name: %', role_name, _role_id, _user_name;
                            END IF;	    
                        END; 
                        $function$
        ;

        CREATE OR REPLACE FUNCTION sp_revoke_role_from_user(role_name character varying, _user_name character varying)
        RETURNS void
        LANGUAGE plpgsql
        AS $function$
                        DECLARE  
                            _role_id int;
                            _user_id int;
                            _user_role_id int;
                            _role_count int;
                            _user_count int;
                            _user_role_count int;    	                	
                        BEGIN	

                            SELECT INTO _role_count COUNT(*) FROM "role" r where r.name = role_name;
                            SELECT INTO _user_count COUNT(*) FROM "user" u WHERE u.user_name = _user_name;

                            RAISE NOTICE 'user_count: %',_user_count;
                            RAISE NOTICE 'role_count: %',_role_count;

                            IF _role_count = 0 THEN	
                                RAISE NOTICE 'role_name: % not found!',role_name;
                                RETURN;	
                            ELSIF _user_count = 0 THEN	
                                RAISE NOTICE 'user_name: % not found!',_user_name;
                                RETURN;	
                            
                            ELSIF _role_count > 1 THEN	
                                RAISE NOTICE 'role_name: % , role_count: % more than one role!', role_name, _role_count;
                                RETURN;	
                            ELSIF _user_count > 1 THEN	
                                RAISE NOTICE 'user_name: % , user_count: % more than one username!', _user_name, _user_count;
                                RETURN;	
                            ELSIF _role_count = 1 AND _user_count = 1 THEN	
                                SELECT INTO _role_id "id" FROM "role" r WHERE r."name" = role_name;	
                                RAISE NOTICE 'role_id: %',_role_id;
                                SELECT INTO _user_id "id" FROM "user" u WHERE u.user_name = _user_name;
                                RAISE NOTICE 'user_id: %',_user_id;			
                            ELSE	
                                RAISE EXCEPTION 'undefined situation!';
                                RETURN;
                            END IF;
                            SELECT INTO _user_role_count COUNT(*) FROM user_role ur WHERE ur.role_id = _role_id AND ur.user_id = _user_id;	
                            RAISE NOTICE 'user_role_count: %',_user_role_count;	
                            IF _user_role_count = 0 THEN	
                                RAISE NOTICE 'There is no such assignemt already!; role_name: %, role_id: % - user_name: %, user_id: %',role_name, role_id, _user_name, user_id;
                                RETURN;	
                            ELSE
                                DELETE FROM user_role ur where ur.role_id  = _role_id and ur.user_id = _user_id;
                                RAISE NOTICE 'Role revoke successful ; role_name: % , role_id: % - user_name: % , user_id: %', role_name, _role_id, _user_name, _user_id;
                            END IF;    
                        END;
                        $function$
        ;

        CREATE OR REPLACE FUNCTION sp_revoke_all_roles_from_user(_user_name character varying)
        RETURNS void
        LANGUAGE plpgsql
        AS $function$                            
            DECLARE
                _user_id int;
                _user_count int;  
            BEGIN                                                 
                SELECT INTO _user_count COUNT(*) FROM "user" u WHERE u.user_name = _user_name;                       
                IF _user_count = 0 THEN
                    RAISE EXCEPTION 'user_name: % not found', _user_name;
                    RETURN;
                ELSIF _user_count > 1 THEN
                    RAISE EXCEPTION 'user_name: % , count: % more than one user!', _user_name, _user_count;
                    RETURN;
                ELSIF _user_count = 1 THEN
                    SELECT INTO _user_id "id" FROM "user" u WHERE u.user_name = _user_name;
                    RAISE NOTICE 'user_id: % ', _user_id;                       
                        delete from user_role uro where uro.user_id = _user_id;    
                ELSE
                    RAISE EXCEPTION 'undefined situation!';
                    RETURN;
                END IF;
                END;
            $function$
        ;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP FUNCTION IF EXISTS sp_assign_right_to_role;
        DROP FUNCTION IF EXISTS sp_assign_role_to_user;
        DROP FUNCTION IF EXISTS sp_revoke_right_from_role;
        DROP FUNCTION IF EXISTS sp_revoke_all_roles_from_user;
        DROP FUNCTION IF EXISTS sp_revoke_role_from_user;
        `);
  }
}
