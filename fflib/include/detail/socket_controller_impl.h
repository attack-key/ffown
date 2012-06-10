#ifndef _SOCKET_CONTROLLER_IMPL_H_
#define _SOCKET_CONTROLLER_IMPL_H_

#include <string>
using namespace std;

#include "socket_controller_i.h"
#include "message.h"
#include "msg_handler_i.h"

class socket_i;

class socket_controller_impl_t: public socket_controller_i
{
public:
    socket_controller_impl_t(msg_handler_ptr_t msg_handler_);
    ~socket_controller_impl_t();
    virtual int handle_error(socket_i*);
    virtual int handle_read(socket_i*, char* buff, size_t len);
    virtual int handle_write_completed(socket_i*);

    virtual int check_pre_send(socket_i*, string& buff_);

private:
    msg_handler_ptr_t   m_msg_handler;
    size_t              m_have_recv_size;
    message_t           m_message;
};
#endif
