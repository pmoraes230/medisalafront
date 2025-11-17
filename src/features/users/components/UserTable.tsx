/* eslint-disable @typescript-eslint/no-unused-vars */
import { User } from '../types/user';

interface UserTableProps {
    users: User[];
    onEdit: (id: number) => void;
    onToggleStatus: (id: number) => void;
    onDelete: (user: User) => void;
}

export default function UserTable({ users, onEdit, onToggleStatus, onDelete }: UserTableProps) {
    const perfis = {
        1: { nome: 'Administrador', badge: 'bg-indigo-100 text-indigo-700' },
        2: { nome: 'Professor', badge: 'bg-amber-100 text-amber-700' },
        3: { nome: 'Aluno', badge: 'bg-emerald-100 text-emerald-700' }
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <table className="w-full">
                <thead className="bg-slate-50">
                    <tr>
                        <th className="text-left p-6 font-semibold text-slate-700">User</th>
                        <th className="text-left p-6 font-semibold text-slate-700">Email</th>
                        <th className="text-left p-6 font-semibold text-slate-700">Role</th>
                        <th className="text-left p-6 font-semibold text-slate-700">Status</th>
                        <th className="text-left p-6 font-semibold text-slate-700">Joined Date</th>
                        <th className="p-6"></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => {
                        const inicial = user.nome_usuario.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
                        return (
                            <tr key={user.id_usuario} className="border-t hover:bg-slate-50 transition">
                                <td className="p-6">
                                    <div className="flex items-center gap-4">
                                        {user.foto_usuario ?
                                            <img src={user.foto_usuario} className="w-10 h-10 rounded-full object-cover" /> :
                                            <div className="w-10 h-10 bg-teal-700 text-white rounded-full flex items-center justify-center font-bold">
                                                {inicial}
                                            </div>
                                        }
                                        <div>
                                            <div className="font-semibold">{user.nome_usuario}</div>
                                            <div className="text-sm text-slate-500">{user.email_usuario}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-6 text-slate-600">{user.email_usuario}</td>
                                <td className="p-6">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${perfis[user.id_perfil].badge}`}>
                                        {perfis[user.id_perfil].nome}
                                    </span>
                                </td>
                                <td className="p-6">
                                    <span className={user.status === 'inativo' ? 'text-red-600' : 'text-emerald-600'}>{user.status === 'inativo' ? 'Inativo' : 'Ativo'}</span>
                                </td>
                                <td className="p-6 text-slate-600">{user.data_cadastro}</td>
                                <td className="p-6 text-right">
                                    <button className="text-slate-500 hover:text-slate-800">
                                        <i className="fas fa-ellipsis-h"></i>
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}