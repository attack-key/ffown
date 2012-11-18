
#ifndef _MANAGER_SERVICE_H_
#define _MANAGER_SERVICE_H_

#include "common_msg_def.h"
#include "msg_bus.h"

namespace ff {

class logic_service_t
{
public:
    struct client_session_t
    {
        client_session_t():gwid(0){}
        long gwid;
    };
public:
    logic_service_t();
    ~logic_service_t();

    virtual int login(login_t::in_t& msg_, rpc_callcack_t<login_t::out_t>& cb_);
    virtual int logout(logout_t::in_t& msg_, rpc_callcack_t<logout_t::out_t>& cb_);
    virtual int common_msg(common_msg_t::in_t& msg_, rpc_callcack_t<common_msg_t::out_t>& cb_);
private:
    map<long, client_session_t>     m_all_clients;
};

}
#endif
